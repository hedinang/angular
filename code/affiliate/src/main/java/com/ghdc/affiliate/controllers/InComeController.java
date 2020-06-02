package com.ghdc.affiliate.controllers;

import com.ghdc.affiliate.core.AbstractController;
import com.ghdc.affiliate.core.PageRequest;
import com.ghdc.affiliate.core.Utils;
import com.ghdc.affiliate.core.res.MessageResponse;
import com.ghdc.affiliate.core.res.PageResponse;
import com.ghdc.affiliate.exceptions.BadRequestException;
import com.ghdc.affiliate.exceptions.NotFoundException;
import com.ghdc.affiliate.model.campain.Campaign;
import com.ghdc.affiliate.model.income.InCome;
import com.ghdc.affiliate.model.income.InComeRequest;
import com.ghdc.affiliate.model.income.InComeResponse;
import com.ghdc.affiliate.model.partner.Partner;
import com.ghdc.affiliate.services.CampaignServices;
import com.ghdc.affiliate.services.InComeServices;
import com.ghdc.affiliate.services.PartnerServices;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/{id}")
    public InComeResponse findOneByID(@PathVariable("id") Long id) {
        InCome inCome = inComeServices.read(affiliateConfig.getDbDefault(), id)
                .orElseThrow(() -> new NotFoundException("Not found Item!"));
        return new InComeResponse(inCome);
    }

    @PostMapping("/page")
    public PageResponse<InComeResponse> getPage(@RequestBody PageRequest request) {
        PageResponse<InCome> pageResponse = inComeServices.getPage(affiliateConfig.getDbDefault(), request);
        List<InComeResponse> partnerResponses = pageResponse.getList()
                .stream()
                .map(InComeResponse::new)
                .collect(Collectors.toList());
        PageResponse<InComeResponse> response = new PageResponse<>();
        response.setList(partnerResponses);
        response.setPage(pageResponse.getPage());
        response.setLimit(pageResponse.getLimit());
        response.setTotal(pageResponse.getTotal());
        return response;
    }

}
