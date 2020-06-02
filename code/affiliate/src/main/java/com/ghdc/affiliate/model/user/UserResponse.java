package com.ghdc.affiliate.model.user;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserResponse {
    public Integer id;
    public Integer partnerId;
    public String partnerName;
    public String code;
    public String userName;
    public String displayName;
    public String email;
    public String phoneNumber;
    public Integer groupId;
    public String groupName;
    public Boolean isActive;

    public UserResponse(User user){
        this.id = user.getId();
        this.partnerId = user.getPartnerId();
        this.code = user.getCode();
        this.userName = user.getUserName();
        this.displayName = user.getDisplayName();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.groupId = user.getGroupId();
        this.isActive = user.getIsActive();
    }
}
