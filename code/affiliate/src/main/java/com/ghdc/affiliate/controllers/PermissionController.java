package com.ghdc.affiliate.controllers;


import com.ghdc.affiliate.core.AbstractController;
import com.ghdc.affiliate.core.PageRequest;
import com.ghdc.affiliate.core.res.PageResponse;
import com.ghdc.affiliate.exceptions.BadRequestException;
import com.ghdc.affiliate.exceptions.NotFoundException;
import com.ghdc.affiliate.jwt.JwtUserDetails;
import com.ghdc.affiliate.model.group.Group;
import com.ghdc.affiliate.model.group.GroupResponse;
import com.ghdc.affiliate.model.partner.Partner;
import com.ghdc.affiliate.model.partner.PartnerRequest;
import com.ghdc.affiliate.model.partner.PartnerResponse;
import com.ghdc.affiliate.model.permission.Permission;
import com.ghdc.affiliate.model.permission.PermissionRequest;
import com.ghdc.affiliate.model.permission.PermissionResponse;
import com.ghdc.affiliate.services.DTOServices;
import com.ghdc.affiliate.services.PermissionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("permissions")
public class PermissionController extends AbstractController {
    @Autowired
    PermissionServices permissionServices;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public PermissionResponse createPartner(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @RequestBody PermissionRequest partnerRequest) {
        Integer userId = userDetails.getUser().getId();

        Permission permission = dtoServices.transfer(new Permission(), partnerRequest);
        Permission result = permissionServices.create(userId,affiliateConfig.getDbDefault(), permission)
                .orElseThrow(() -> new BadRequestException("Creation failed, Please try again!"));
        return new PermissionResponse(result);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public PermissionResponse findOneByID(@PathVariable("id") Integer id) {
        Permission permission = permissionServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item!"));
        return new PermissionResponse(permission);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public PermissionResponse updateByID(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("id") Integer id,
            @RequestBody PermissionRequest request) {
        Integer userId = userDetails.getUser().getId();
        Permission permission = permissionServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        Permission resultUpdate = permissionServices
                .update(userId, affiliateConfig.getDbDefault(), dtoServices.transfer(permission, request))
                .orElseThrow(() -> new BadRequestException("Update failed!"));
        return new PermissionResponse(resultUpdate);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public Boolean delete(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("id") Integer id) {
        Integer userId = userDetails.getUser().getId();
        Permission permission = permissionServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        return permissionServices.delete(userId,affiliateConfig.getDbDefault(), permission)
                .orElseThrow(() -> new BadRequestException("Update failed!"));
    }

    @PostMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public List<PermissionResponse> getAll(){
        return permissionServices.getAll(affiliateConfig.getDbDefault())
                .stream()
                .map(PermissionResponse::new)
                .collect(Collectors.toList());
    }

    @PostMapping("/page")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public PageResponse<PermissionResponse> getPage(@RequestBody PageRequest pageRequest){
        PageResponse<Permission> pageResponse = permissionServices.getPage(affiliateConfig.getDbDefault(), pageRequest);
        List<PermissionResponse> permissionResponses = pageResponse.getList()
                .stream()
                .map(PermissionResponse::new)
                .collect(Collectors.toList());
        PageResponse<PermissionResponse> response = new PageResponse<>();
        response.setList(permissionResponses);
        response.setPage(pageResponse.getPage());
        response.setLimit(pageResponse.getLimit());
        response.setTotal(pageResponse.getTotal());
        return response;
    }
}
