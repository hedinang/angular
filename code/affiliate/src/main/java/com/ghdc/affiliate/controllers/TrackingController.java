package com.ghdc.affiliate.controllers;


import com.ghdc.affiliate.core.AbstractController;
import com.ghdc.affiliate.core.PageRequest;
import com.ghdc.affiliate.core.res.PageResponse;
import com.ghdc.affiliate.exceptions.BadRequestException;
import com.ghdc.affiliate.exceptions.NotFoundException;
import com.ghdc.affiliate.model.campain.Campaign;
import com.ghdc.affiliate.model.income.InCome;
import com.ghdc.affiliate.model.income.InComeResponse;
import com.ghdc.affiliate.model.track.Tracking;
import com.ghdc.affiliate.model.track.TrackingRequest;
import com.ghdc.affiliate.model.track.TrackingResponse;
import com.ghdc.affiliate.services.CampaignServices;
import com.ghdc.affiliate.services.CheckISPServices;
import com.ghdc.affiliate.services.TrackingServices;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("tracks")
public class TrackingController extends AbstractController {
    @Autowired
    TrackingServices trackingServices;
    @Autowired
    CampaignServices campaignServices;
    @Autowired
    CheckISPServices checkISPServices;

    @PostMapping
    public boolean createTracking(
            HttpServletRequest httpRequest,
            @RequestBody TrackingRequest request) {
        Campaign campaign = campaignServices.findByCode(affiliateConfig.getDbDefault(), request.campaignCode)
                .orElseThrow(() -> new NotFoundException("Not found campaign  by code " + request.campaignCode));
        Tracking tracking = new Tracking();
        tracking.setIpAddress(httpRequest.getRemoteAddr());
        tracking.setCampaignId(campaign.getId());
        tracking.setIsp(checkISPServices.getIspByIP(affiliateConfig.getDbDefault(), httpRequest.getRemoteAddr()));
        ResponseEntity<String> json = new RestTemplate().getForEntity("http://ip-api.com/json/" + httpRequest.getRemoteAddr(), String.class);
        System.out.println(json);
        Tracking input = dtoServices.transfer(tracking, request);
        putToRabbit(affiliateConfig.getDbDefault(), "CREATE", input, Tracking.class);
        return true;
    }

    @PutMapping("/{sessionTracking}/isClicked")
    public boolean isClicked(@PathVariable("sessionTracking") String sessionTracking) {
        Tracking tracking = trackingServices.findBySessionId(affiliateConfig.getDbDefault(), sessionTracking)
                .orElseThrow(() -> new NotFoundException("Not found session " + sessionTracking));
        Tracking resultClick = trackingServices.setIsClick(affiliateConfig.getDbDefault(), tracking);
        if (resultClick != null){
            putToRabbit(affiliateConfig.getDbDefault(), "UPDATE", resultClick, Tracking.class);
        }
        return resultClick != null;
    }

    @PostMapping("/page")
    public PageResponse<TrackingResponse> getPage(@RequestBody PageRequest request) {
        PageResponse<Tracking> pageResponse = trackingServices.getPage(affiliateConfig.getDbDefault(), request);
        List<TrackingResponse> partnerResponses = pageResponse.getList()
                .stream()
                .map(TrackingResponse::new)
                .collect(Collectors.toList());
        PageResponse<TrackingResponse> response = new PageResponse<>();
        response.setList(partnerResponses);
        response.setPage(pageResponse.getPage());
        response.setLimit(pageResponse.getLimit());
        response.setTotal(pageResponse.getTotal());
        return response;
    }
}
