package com.ghdc.affiliate.controllers;

import com.ghdc.affiliate.core.AbstractController;
import com.ghdc.affiliate.core.PageRequest;
import com.ghdc.affiliate.core.res.PageResponse;
import com.ghdc.affiliate.exceptions.BadRequestException;
import com.ghdc.affiliate.exceptions.NotFoundException;
import com.ghdc.affiliate.jwt.JwtUserDetails;
import com.ghdc.affiliate.model.partner.Partner;
import com.ghdc.affiliate.model.partner.PartnerResponse;
import com.ghdc.affiliate.model.user.User;
import com.ghdc.affiliate.model.user.UserRequest;
import com.ghdc.affiliate.model.user.UserResponse;
import com.ghdc.affiliate.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("users")
public class UserController extends AbstractController {
    @Autowired
    UserServices userServices;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','CREATE_USER')")
    public UserResponse create(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @RequestBody UserRequest userRequest) {
        Integer userId = userDetails.getUser().getId();
        User user = dtoServices.transfer(new User(), userRequest);
        User result = userServices.create(userId, affiliateConfig.getDbDefault(), user)
                .orElseThrow(() -> new BadRequestException("Creation failed, Please try again!"));
        return new UserResponse(result);
    }

    @GetMapping("/{id}")
    public UserResponse findOneByID(@PathVariable("id") Integer id) {
        User user = userServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item!"));
        return transferResponseServices.transferUser(affiliateConfig.getDbDefault(), user);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','UPDATE_USER')")
    public UserResponse updateByID(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("id") Integer id,
            @RequestBody UserRequest request) {
        Integer userId = userDetails.getUser().getId();
        User user = userServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        User resultUpdate = userServices
                .update(userId, affiliateConfig.getDbDefault(), dtoServices.transfer(user, request))
                .orElseThrow(() -> new BadRequestException("Update failed!"));
        return transferResponseServices.transferUser(affiliateConfig.getDbDefault(), resultUpdate);
    }

    @DeleteMapping("/{code}")
    @PreAuthorize("hasAnyAuthority('ADMIN','DELETE_USER')")
    public Boolean delete(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("code") String code) {
        Integer userId = userDetails.getUser().getId();
        User user = userServices.findByCode(affiliateConfig.getDbDefault(), code)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        return userServices.delete(userId, affiliateConfig.getDbDefault(), user)
                .orElseThrow(() -> new BadRequestException("Delete failed!"));
    }

    @PutMapping("/{code}/locked")
    @PreAuthorize("hasAnyAuthority('ADMIN','UPDATE_USER')")
    public Boolean locked(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("code") String code) {
        Integer userId = userDetails.getUser().getId();
        User user = userServices.findByCode(affiliateConfig.getDbDefault(), code)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        return userServices.locked(userId,affiliateConfig.getDbDefault(), user);
    }

    @PutMapping("/{code}/unlocked")
    @PreAuthorize("hasAnyAuthority('ADMIN','UPDATE_USER')")
    public Boolean unlocked(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("code") String code) {
        Integer userId = userDetails.getUser().getId();
        User user = userServices.findByCode(affiliateConfig.getDbDefault(), code)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        return userServices.unlocked(userId, affiliateConfig.getDbDefault(), user);
    }

    @PostMapping("/page")
    @PreAuthorize("hasAnyAuthority('ADMIN','READ_USER')")
    public PageResponse<UserResponse> getPage(@RequestBody(required = false) PageRequest request) {
        PageResponse<User> pageResponse = userServices.getPage(affiliateConfig.getDbDefault(), request);
        List<UserResponse> partnerResponses = pageResponse.getList()
                .stream()
                .map(user -> transferResponseServices.transferUser(affiliateConfig.getDbDefault(), user))
                .collect(Collectors.toList());
        PageResponse<UserResponse> response = new PageResponse<>();
        response.setList(partnerResponses);
        response.setPage(pageResponse.getPage());
        response.setLimit(pageResponse.getLimit());
        response.setTotal(pageResponse.getTotal());
        return response;
    }
}
