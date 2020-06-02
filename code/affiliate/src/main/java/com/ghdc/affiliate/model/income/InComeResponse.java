package com.ghdc.affiliate.model.income;

import java.sql.Timestamp;

public class InComeResponse {
    public Long id;
    public String service;
    public String type;
    public String channel;
    public String msisdn;
    public String requestId;
    public Integer price;
    public String details;
    public String transactionTime;
    public Boolean status;
    public String telco;
    public String shortCode;
    public String description;
    public String sign;
    public Timestamp timeUpdated;

    public InComeResponse(InCome income){
        this.id = income.getId();
        this.service = income.getService();
        this.type = income.getType();
        this.channel = income.getChannel();
        this.msisdn = income.getMsisdn();
        this.requestId = income.getRequestId();
        this.price = income.getPrice();
        this.details = income.getDetails();
        this.transactionTime = income.getTransactionTime();
        this.status = income.getStatus();
        this.telco = income.getTelco();
        this.shortCode = income.getShortCode();
        this.description = income.getDescription();
        this.sign = income.getSign();
        this.timeUpdated = income.getAudit().getTimeUpdated();
    }
}
