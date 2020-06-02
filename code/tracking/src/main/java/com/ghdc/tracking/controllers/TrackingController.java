package com.ghdc.tracking.controllers;


import com.ghdc.tracking.core.AbstractController;
import com.ghdc.tracking.exceptions.NotFoundException;
import com.ghdc.tracking.model.campain.Campaign;
import com.ghdc.tracking.model.track.Tracking;
import com.ghdc.tracking.model.track.TrackingRequest;
import com.ghdc.tracking.services.CampaignServices;
import com.ghdc.tracking.services.CheckISPServices;
import com.ghdc.tracking.services.TrackingServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;

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
}
