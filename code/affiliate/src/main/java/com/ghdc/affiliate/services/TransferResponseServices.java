package com.ghdc.affiliate.services;

import com.ghdc.affiliate.model.group.Group;
import com.ghdc.affiliate.model.partner.Partner;
import com.ghdc.affiliate.model.user.User;
import com.ghdc.affiliate.model.user.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransferResponseServices {
    @Autowired
    GroupServices groupServices;
    @Autowired
    PartnerServices partnerServices;

    public UserResponse transferUser(String db, User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.id = user.getId();
        userResponse.code = user.getCode();
        userResponse.userName = user.getUserName();
        userResponse.displayName = user.getDisplayName();
        userResponse.email = user.getEmail();
        userResponse.phoneNumber = user.getPhoneNumber();
        userResponse.isActive = user.getIsActive();
        if (user.getGroupId() != null) {
            userResponse.groupId = user.getGroupId();
            userResponse.groupName = groupServices
                    .read(db, user.getGroupId())
                    .orElse(new Group()).getName();
        }

        if (user.getPartnerId() != null) {
            userResponse.partnerId = user.getPartnerId();
            userResponse.partnerName = partnerServices
                    .read(db, user.getPartnerId())
                    .orElse(new Partner()).getName();
        }
        return userResponse;
    }
}
