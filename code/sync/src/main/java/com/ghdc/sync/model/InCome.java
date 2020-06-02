package com.ghdc.sync.model;


import com.ghdc.sync.core.entity.Audit;
import com.ghdc.sync.core.entity.AuditListener;
import com.ghdc.sync.core.entity.Auditable;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "income")
@EntityListeners(AuditListener.class)
public class InCome implements Auditable {
    private Long id;
    private String service;
    private Integer campaignId;
    private String type;
    private String channel;
    private String msisdn;
    private String requestId;
    private Integer price;
    private String details;
    private String transactionTime;
    private Boolean status;
    private String telco;
    private String shortCode;
    private String description;
    private String sign;
    private String partnerCode;
    @Embedded
    private Audit audit;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "service")
    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    @Basic
    @Column(name = "campaign_id")
    public Integer getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Integer campaignId) {
        this.campaignId = campaignId;
    }

    @Basic
    @Column(name = "type")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "channel")
    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    @Basic
    @Column(name = "msisdn")
    public String getMsisdn() {
        return msisdn;
    }

    public void setMsisdn(String msisdn) {
        this.msisdn = msisdn;
    }

    @Basic
    @Column(name = "request_id")
    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    @Basic
    @Column(name = "price")
    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Basic
    @Column(name = "details")
    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    @Basic
    @Column(name = "transaction_time")
    public String getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(String transactionTime) {
        this.transactionTime = transactionTime;
    }

    @Basic
    @Column(name = "status")
    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Basic
    @Column(name = "telco")
    public String getTelco() {
        return telco;
    }

    public void setTelco(String telco) {
        this.telco = telco;
    }

    @Basic
    @Column(name = "short_code")
    public String getShortCode() {
        return shortCode;
    }

    public void setShortCode(String shortCode) {
        this.shortCode = shortCode;
    }

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "sign")
    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }


    @Basic
    @Column(name = "partner_code")
    public String getPartnerCode() {
        return partnerCode;
    }

    public void setPartnerCode(String partnerCode) {
        this.partnerCode = partnerCode;
    }

    @Override
    public Audit getAudit() {
        return audit;
    }

    @Override
    public void setAudit(Audit audit) {
        this.audit = audit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InCome income = (InCome) o;
        return id.equals(income.id) &&
                Objects.equals(service, income.service) &&
                Objects.equals(type, income.type) &&
                Objects.equals(channel, income.channel) &&
                Objects.equals(msisdn, income.msisdn) &&
                Objects.equals(requestId, income.requestId) &&
                Objects.equals(price, income.price) &&
                Objects.equals(details, income.details) &&
                Objects.equals(transactionTime, income.transactionTime) &&
                Objects.equals(status, income.status) &&
                Objects.equals(telco, income.telco) &&
                Objects.equals(shortCode, income.shortCode) &&
                Objects.equals(description, income.description) &&
                Objects.equals(campaignId, income.campaignId)&&
                Objects.equals(sign, income.sign);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, service, type, channel, msisdn, requestId, price, details, transactionTime, status, telco, shortCode, description, sign, campaignId);
    }

}
