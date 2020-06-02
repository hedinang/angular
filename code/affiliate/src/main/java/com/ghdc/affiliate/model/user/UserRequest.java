package com.ghdc.affiliate.model.user;

import org.springframework.lang.Nullable;

public class UserRequest {
    public Integer partnerId;
    public String username;
    public String password;
    public String email;
    public String displayName;
    public String phoneNumber;
    @Nullable
    public Integer groupId;
}
