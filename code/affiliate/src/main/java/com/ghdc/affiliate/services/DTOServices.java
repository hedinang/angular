package com.ghdc.affiliate.services;

import com.ghdc.affiliate.model.campain.Campaign;
import com.ghdc.affiliate.model.campain.CampaignRequest;
import com.ghdc.affiliate.model.group.Group;
import com.ghdc.affiliate.model.group.GroupRequest;
import com.ghdc.affiliate.model.income.InComeRequest;
import com.ghdc.affiliate.model.income.InCome;
import com.ghdc.affiliate.model.partner.PartnerRequest;
import com.ghdc.affiliate.model.partner.Partner;
import com.ghdc.affiliate.model.permission.Permission;
import com.ghdc.affiliate.model.permission.PermissionRequest;
import com.ghdc.affiliate.model.track.Tracking;
import com.ghdc.affiliate.model.track.TrackingRequest;
import com.ghdc.affiliate.model.user.User;
import com.ghdc.affiliate.model.user.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DTOServices {
    @Autowired
    PartnerServices partnerServices;

    public User transfer(User user, UserRequest request) {
        if (user == null) user = new User();
        user.setPartnerId(request.partnerId);
        user.setUserName(request.username);
        user.setPassword(new BCryptPasswordEncoder().encode(request.password));
        user.setEmail(request.email);
        user.setPhoneNumber(request.phoneNumber);
        user.setDisplayName(request.displayName);
        user.setGroupId(request.groupId);
        return user;
    }

    public Permission transfer(Permission permission, PermissionRequest request) {
        if (permission == null) permission = new Permission();
        permission.setCode(request.code);
        permission.setName(request.name);
        permission.setDescriptions(request.descriptions);
        permission.setParentId(request.parentId);
        return permission;
    }

    public Group transfer(Group group, GroupRequest request) {
        if (group == null) group = new Group();
        group.setCode(request.code);
        group.setName(request.name);
        group.setDescriptions(request.descriptions);
        return group;
    }

    public Partner transfer(Partner partner, PartnerRequest request) {
        if (partner == null) partner = new Partner();
        partner.setName(request.name);
        partner.setDescription(request.description);
        return partner;
    }

    public Campaign transfer(Campaign campaign, CampaignRequest request) {
        if (campaign == null) campaign = new Campaign();
        campaign.setPartnerId(request.partnerId);
        campaign.setTitle(request.title);
        campaign.setSource(request.source);
        campaign.setIsPostBack(request.isPostBack);
        campaign.setType(request.type);
        return campaign;
    }

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
