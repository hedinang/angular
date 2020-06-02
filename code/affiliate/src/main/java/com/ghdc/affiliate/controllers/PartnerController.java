package com.ghdc.affiliate.controllers;

import com.ghdc.affiliate.core.AbstractController;
import com.ghdc.affiliate.core.PageRequest;
import com.ghdc.affiliate.core.res.PageResponse;
import com.ghdc.affiliate.exceptions.BadRequestException;
import com.ghdc.affiliate.exceptions.NotFoundException;
import com.ghdc.affiliate.jwt.JwtUserDetails;
import com.ghdc.affiliate.model.partner.PartnerRequest;
import com.ghdc.affiliate.model.partner.PartnerResponse;
import com.ghdc.affiliate.model.partner.Partner;
import com.ghdc.affiliate.services.DTOServices;
import com.ghdc.affiliate.services.PartnerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("partners")
public class PartnerController extends AbstractController {
    @Autowired
    PartnerServices partnerServices;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','CREATE_PARTNER')")
    public PartnerResponse createPartner(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @RequestBody PartnerRequest partnerRequest) {
        Integer userId = userDetails.getUser().getId();
        Partner partner = dtoServices.transfer(new Partner(), partnerRequest);
        Partner result = partnerServices.create(userId, affiliateConfig.getDbDefault(), partner)
                .orElseThrow(() -> new BadRequestException("Creation failed, Please try again!"));
        return new PartnerResponse(result);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','READ_PARTNER')")
    public PartnerResponse findOneByID(@PathVariable("id") Integer id) {
        Partner partner = partnerServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item!"));
        return new PartnerResponse(partner);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','UPDATE_PARTNER')")
    public PartnerResponse updateByID(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("id") Integer id,
            @RequestBody PartnerRequest request) {
        Integer userId = userDetails.getUser().getId();
        Partner partner = partnerServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        Partner resultUpdate = partnerServices
                .update(userId, affiliateConfig.getDbDefault(), dtoServices.transfer(partner, request))
                .orElseThrow(() -> new BadRequestException("Update failed!"));
        return new PartnerResponse(resultUpdate);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','DELETE_PARTNER')")
    public Boolean delete(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("id") Integer id) {
        Integer userId = userDetails.getUser().getId();
        Partner partner = partnerServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        return partnerServices.delete(userId, affiliateConfig.getDbDefault(), partner)
                .orElseThrow(() -> new BadRequestException("Update failed!"));
    }

    @PostMapping("/page")
    @PreAuthorize("hasAnyAuthority('ADMIN','READ_PARTNER')")
    public PageResponse<PartnerResponse> getPage(@RequestBody PageRequest request) {
        PageResponse<Partner> pageResponse = partnerServices.getPage(affiliateConfig.getDbDefault(), request);
        List<PartnerResponse> partnerResponses = pageResponse.getList()
                .stream()
                .map(PartnerResponse::new)
                .collect(Collectors.toList());
        PageResponse<PartnerResponse> response = new PageResponse<>();
        response.setList(partnerResponses);
        response.setPage(pageResponse.getPage());
        response.setLimit(pageResponse.getLimit());
        response.setTotal(pageResponse.getTotal());
        return response;
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN','READ_PARTNER')")
    public List<PartnerResponse> getAll() {
        List<Partner> partners = partnerServices.getAll(affiliateConfig.getDbDefault());
        return partners
                .stream()
                .map(PartnerResponse::new)
                .collect(Collectors.toList());
    }

}
