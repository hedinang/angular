package com.ghdc.tracking.services;

import com.ghdc.tracking.model.income.InCome;
import com.ghdc.tracking.model.income.InComeRequest;
import com.ghdc.tracking.model.track.Tracking;
import com.ghdc.tracking.model.track.TrackingRequest;
import org.springframework.stereotype.Service;

@Service
public class DTOServices {

    public Tracking transfer(Tracking tracking, TrackingRequest request) {
        if (tracking == null) tracking = new Tracking();
        tracking.setCampaignCode(request.campaignCode);
        tracking.setSessionTracking(request.sessionTracking);
        tracking.setOs(request.os);
        tracking.setBrowserDevice(request.browserDevice);
        tracking.setParams(request.params);
        tracking.setPaths(request.path);
        tracking.setScreenSize(request.screenSize);
        tracking.setIpReference(request.ipReference);
        return tracking;
    }

    public InCome transfer(InCome income, InComeRequest request) {
        if (income == null) income = new InCome();
        income.setService(request.service);
        income.setType(request.type);
        income.setChannel(request.channel);
        income.setMsisdn(request.msisdn);
        income.setRequestId(request.requestId);
        income.setPrice(request.price);
        income.setDetails(request.details);
        income.setTransactionTime(request.transactionTime);
        income.setStatus(request.status);
        income.setTelco(request.telco);
        income.setShortCode(request.shortCode);
        income.setDescription(request.description);
        income.setPartnerCode(request.partnerCode);
        income.setSign(request.sign);
        return income;
    }
}
