package com.ghdc.tracking.controllers;

import com.ghdc.tracking.core.AbstractController;
import com.ghdc.tracking.core.Utils;
import com.ghdc.tracking.core.res.MessageResponse;
import com.ghdc.tracking.exceptions.NotFoundException;
import com.ghdc.tracking.model.campain.Campaign;
import com.ghdc.tracking.model.income.InCome;
import com.ghdc.tracking.model.income.InComeRequest;
import com.ghdc.tracking.model.partner.Partner;
import com.ghdc.tracking.services.CampaignServices;
import com.ghdc.tracking.services.InComeServices;
import com.ghdc.tracking.services.PartnerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("incomes")
public class InComeController extends AbstractController {
    @Autowired
    InComeServices inComeServices;
    @Autowired
    PartnerServices partnerServices;
    @Autowired
    CampaignServices campaignServices;
    @PostMapping
    public MessageResponse create(
            @Valid  @RequestBody InComeRequest inComeRequest) {
        Campaign campaign = campaignServices.findByCode(affiliateConfig.getDbDefault(), inComeRequest.service)
                .orElseThrow(() -> new NotFoundException("Not found campaign  by code " + inComeRequest.service));
        Partner partner = partnerServices
                .findByCode(affiliateConfig.getDbDefault(), inComeRequest.partnerCode)
                .orElse(null);
        if (partner != null) {
            String inputMD5 = inComeRequest.msisdn + inComeRequest.requestId + inComeRequest.partnerCode + partner.getToken();
            String sign = Utils.getMd5(inputMD5);
            if (!sign.equals(inComeRequest.sign)) return new MessageResponse(400, "Sign is invalid!");
        }
        InCome income = dtoServices.transfer(new InCome(), inComeRequest);
        income.setCampaignId(campaign.getId());
        putToRabbit(affiliateConfig.getDbDefault(), "CREATE", income, InCome.class);
        return new MessageResponse(0, "Create success!");
    }
}
