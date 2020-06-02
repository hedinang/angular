package com.ghdc.affiliate.controllers;

import com.ghdc.affiliate.core.AbstractController;
import com.ghdc.affiliate.core.PageRequest;
import com.ghdc.affiliate.core.res.PageResponse;
import com.ghdc.affiliate.exceptions.BadRequestException;
import com.ghdc.affiliate.exceptions.NotFoundException;
import com.ghdc.affiliate.jwt.JwtUserDetails;
import com.ghdc.affiliate.model.group.Group;
import com.ghdc.affiliate.model.group.GroupPermission;
import com.ghdc.affiliate.model.group.GroupRequest;
import com.ghdc.affiliate.model.group.GroupResponse;
import com.ghdc.affiliate.model.income.InCome;
import com.ghdc.affiliate.model.income.InComeResponse;
import com.ghdc.affiliate.model.permission.Permission;
import com.ghdc.affiliate.model.permission.PermissionResponse;
import com.ghdc.affiliate.services.GroupPermissionServices;
import com.ghdc.affiliate.services.GroupServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("groups")
public class GroupController extends AbstractController {

    @Autowired
    GroupServices groupServices;
    @Autowired
    GroupPermissionServices groupPermissionServices;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','CREATE_GROUP')")
    public GroupResponse create(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @RequestBody GroupRequest groupRequest) {
        Integer userId = userDetails.getUser().getId();
        Group group = dtoServices.transfer(new Group(), groupRequest);
        Group result = groupServices.create(userId, affiliateConfig.getDbDefault(), group)
                .orElseThrow(() -> new BadRequestException("Creation failed, Please try again!"));
        List<GroupPermission> groupPermissions = groupRequest
                .permissions
                .stream()
                .map(permissionId -> {
                    GroupPermission groupPermission = new GroupPermission();
                    groupPermission.setGroupId(result.getId());
                    groupPermission.setPermissionId(permissionId);
                    return groupPermission;
                })
                .collect(Collectors.toList());
        groupPermissionServices.createBulk(userId, affiliateConfig.getDbDefault(), groupPermissions);

        List<Permission> permissions = groupPermissionServices.getPermissionByGroupId(affiliateConfig.getDbDefault(), result.getId());
        List<PermissionResponse> permissionResponses = permissions
                .stream()
                .map(PermissionResponse::new)
                .collect(Collectors.toList());
        GroupResponse groupResponse = new GroupResponse(result);
        groupResponse.permissions = permissionResponses;
        return groupResponse;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','READ_GROUP')")
    public GroupResponse findOneByID(@PathVariable("id") Integer id) {
        Group group = groupServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found item!"));
        List<Permission> permissions = groupPermissionServices.getPermissionByGroupId(affiliateConfig.getDbDefault(), id);
        List<PermissionResponse> permissionResponses = permissions
                .stream()
                .map(PermissionResponse::new)
                .collect(Collectors.toList());
        GroupResponse groupResponse = new GroupResponse(group);
        groupResponse.permissions = permissionResponses;
        return groupResponse;
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','UPDATE_GROUP')")
    public GroupResponse updateByID(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("id") Integer id, @RequestBody GroupRequest request) {
        Integer userId = userDetails.getUser().getId();
        Group group = groupServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        Group resultUpdate = groupServices
                .update(userId, affiliateConfig.getDbDefault(), dtoServices.transfer(group, request))
                .orElseThrow(() -> new BadRequestException("Update failed!"));
        boolean deleteByGroup = groupPermissionServices.deleteByGroupId(affiliateConfig.getDbDefault(), id);
        if ((resultUpdate != null) && deleteByGroup) {
            List<GroupPermission> groupPermissions = request
                    .permissions
                    .stream()
                    .map(permissionId -> {
                        GroupPermission groupPermission = new GroupPermission();
                        groupPermission.setGroupId(id);
                        groupPermission.setPermissionId(permissionId);
                        return groupPermission;
                    })
                    .collect(Collectors.toList());
            groupPermissionServices.createBulk(userId, affiliateConfig.getDbDefault(), groupPermissions);

            List<Permission> permissions = groupPermissionServices.getPermissionByGroupId(affiliateConfig.getDbDefault(), id);
            List<PermissionResponse> permissionResponses = permissions
                    .stream()
                    .map(PermissionResponse::new)
                    .collect(Collectors.toList());
            GroupResponse groupResponse = new GroupResponse(resultUpdate);
            groupResponse.permissions = permissionResponses;
            return groupResponse;
        } else {
            throw new BadRequestException("Update permission of group failed!");
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','DELETE_GROUP')")
    public Boolean delete(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("id") Integer id) {
        Integer userId = userDetails.getUser().getId();
        Group group = groupServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        boolean deleteByGroup = groupPermissionServices.deleteByGroupId(affiliateConfig.getDbDefault(), id);
        return deleteByGroup && groupServices.delete(userId, affiliateConfig.getDbDefault(), group)
                .orElseThrow(() -> new BadRequestException("Update failed!"));
    }

    @PostMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN','READ_GROUP')")
    public List<GroupResponse> getAll(){
        return groupServices.getAll(affiliateConfig.getDbDefault())
                .stream()
                .map(GroupResponse::new)
                .collect(Collectors.toList());
    }

    @PostMapping("/page")
    @PreAuthorize("hasAnyAuthority('ADMIN','READ_GROUP')")
    public PageResponse<GroupResponse> getPage(@RequestBody PageRequest pageRequest){
        PageResponse<Group> pageResponse = groupServices.getPage(affiliateConfig.getDbDefault(), pageRequest);
        List<GroupResponse> groupResponses = pageResponse.getList()
                .stream()
                .map(GroupResponse::new)
                .collect(Collectors.toList());
        PageResponse<GroupResponse> response = new PageResponse<>();
        response.setList(groupResponses);
        response.setPage(pageResponse.getPage());
        response.setLimit(pageResponse.getLimit());
        response.setTotal(pageResponse.getTotal());
        return response;
    }
}
