package com.ghdc.affiliate.model.income;

import org.springframework.lang.Nullable;

public class InComeRequest {
    public String service; /*campaign_code*/
    public String type;
    public String channel;
    public String msisdn;
    public String requestId;
    public Integer price;
    @Nullable
    public String details;
    public String transactionTime;
    public Boolean status;
    public String telco;
    public String shortCode;
    @Nullable
    public String description;
    public String partnerCode;
    public String sign;
}
