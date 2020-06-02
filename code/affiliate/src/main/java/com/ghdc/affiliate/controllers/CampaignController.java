package com.ghdc.affiliate.controllers;

import com.ghdc.affiliate.core.AbstractController;
import com.ghdc.affiliate.core.PageRequest;
import com.ghdc.affiliate.core.Utils;
import com.ghdc.affiliate.core.res.PageResponse;
import com.ghdc.affiliate.exceptions.BadRequestException;
import com.ghdc.affiliate.exceptions.NotFoundException;
import com.ghdc.affiliate.jwt.JwtUserDetails;
import com.ghdc.affiliate.model.campain.*;
import com.ghdc.affiliate.services.CampaignServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("campaigns")
public class CampaignController extends AbstractController {
    @Autowired
    CampaignServices campaignServices;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','CREATE_CAMPAIGN')")
    public CampaignResponse create(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @RequestBody CampaignRequest campaignRequest) {
        Integer userId = userDetails.getUser().getId();
        Campaign campaign = dtoServices.transfer(new Campaign(), campaignRequest);
        campaign.setUserId(userId);
        Campaign result = campaignServices.create(userId, affiliateConfig.getDbDefault(), campaign)
                .orElseThrow(() -> new BadRequestException("Creation failed, Please try again!"));
        return new CampaignResponse(result);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','READ_CAMPAIGN')")
    public CampaignResponse findOneByID(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("id") Integer id) {
        Integer userId = userDetails.getUser().getId();
        Campaign campaign = campaignServices.read(affiliateConfig.getDbDefault(), userId, id)
                .orElseThrow(() -> new NotFoundException("Not found Item!"));
        return new CampaignResponse(campaign);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','UPDATE_CAMPAIGN')")
    public CampaignResponse updateByID(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("id") Integer id,
            @RequestBody CampaignRequest request) {
        Integer userId = userDetails.getUser().getId();
        Campaign campaign = campaignServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        Campaign resultUpdate = campaignServices
                .update(userId, affiliateConfig.getDbDefault(), dtoServices.transfer(campaign, request))
                .orElseThrow(() -> new BadRequestException("Update failed!"));
        return new CampaignResponse(resultUpdate);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','DELETE_CAMPAIGN')")
    public Boolean delete(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("id") Integer id) {
        Integer userId = userDetails.getUser().getId();
        Campaign campaign = campaignServices.read(affiliateConfig.getDbDefault(),userId, id)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        return campaignServices.delete(userId, affiliateConfig.getDbDefault(), campaign)
                .orElseThrow(() -> new BadRequestException("Delete failed!"));
    }

    @PostMapping("/page")
    @PreAuthorize("hasAnyAuthority('ADMIN','READ_CAMPAIGN')")
    public PageResponse<CampaignResponse> getPage(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @RequestBody PageRequest request) {
        Integer userId = userDetails.getUser().getId();
        PageResponse<Campaign> pageResponse = campaignServices.getPage(affiliateConfig.getDbDefault(), userId, request);
        List<CampaignResponse> campaignResponses = pageResponse.getList()
                .stream()
                .map(CampaignResponse::new)
                .collect(Collectors.toList());
        PageResponse<CampaignResponse> response = new PageResponse<>();
        response.setList(campaignResponses);
        response.setPage(pageResponse.getPage());
        response.setLimit(pageResponse.getLimit());
        response.setTotal(pageResponse.getTotal());
        return response;
    }

    @PostMapping("/report")
    @PreAuthorize("hasAnyAuthority('ADMIN','REPORT_CAMPAIGN')")
    public List<CampaignReportResponse> getReport(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @RequestBody CampaignDetailRequest request) {
        Integer userId = userDetails.getUser().getId();

        Long timeGte = request.timeFrom;
        Long timeLte = request.timeTo;
        if (timeLte == null) timeLte = System.currentTimeMillis();
        return campaignServices.reportCampaign(affiliateConfig.getDbDefault(), userId, timeGte, timeLte);
    }

    @PostMapping("/{campaign_code}/details")
    @PreAuthorize("hasAnyAuthority('ADMIN','REPORT_CAMPAIGN')")
    public CampaignReportResponse getDetailCampaignByCode(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable("campaign_code") String campaignCode,
            @Valid @RequestBody CampaignDetailRequest request) {
        Integer userId = userDetails.getUser().getId();
        Campaign campaign = campaignServices.findByCode(affiliateConfig.getDbDefault(), userId, campaignCode)
                .orElseThrow(() -> new NotFoundException("Not found Item"));
        Long timeGte = request.timeFrom;
        Long timeLte = request.timeTo;
        if (timeGte == null) throw new BadRequestException("Time bad request!");
        if (timeLte == null) timeLte = System.currentTimeMillis();
        return campaignServices.detailsCampaign(campaign, timeGte, timeLte, request.interval);
    }
}
