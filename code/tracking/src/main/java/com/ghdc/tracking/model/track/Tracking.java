package com.ghdc.tracking.model.track;

import com.ghdc.tracking.core.entity.Audit;
import com.ghdc.tracking.core.entity.AuditListener;
import com.ghdc.tracking.core.entity.Auditable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "tracking")
@EntityListeners(AuditListener.class)
public class Tracking implements Auditable, Serializable {
    private Long id;
    private String campaignCode;
    private Integer campaignId;
    private String sessionTracking;
    private String ipAddress;
    private String ipReference;
    private String browserDevice;
    private String os;
    private String paths;
    private String params;
    private Boolean isClick;
    private String isp;
    private String screenSize;
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

    @Column(name = "campaign_code")
    public String getCampaignCode() {
        return campaignCode;
    }

    public void setCampaignCode(String campaignCode) {
        this.campaignCode = campaignCode;
    }

    @Column(name = "campaign_id")
    public Integer getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Integer campaignId) {
        this.campaignId = campaignId;
    }

    @Basic
    @Column(name = "session_tracking")
    public String getSessionTracking() {
        return sessionTracking;
    }

    public void setSessionTracking(String sessionTracking) {
        this.sessionTracking = sessionTracking;
    }

    @Basic
    @Column(name = "ip_address")
    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    @Basic
    @Column(name = "ip_reference")
    public String getIpReference() {
        return ipReference;
    }

    public void setIpReference(String ipReference) {
        this.ipReference = ipReference;
    }

    @Basic
    @Column(name = "browser_device")
    public String getBrowserDevice() {
        return browserDevice;
    }

    public void setBrowserDevice(String modelDevice) {
        this.browserDevice = modelDevice;
    }

    @Basic
    @Column(name = "os")
    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    @Basic
    @Column(name = "paths")
    public String getPaths() {
        return paths;
    }

    public void setPaths(String paths) {
        this.paths = paths;
    }

    @Basic
    @Column(name = "params")
    public String getParams() {
        return params;
    }

    public void setParams(String params) {
        this.params = params;
    }

    @Basic
    @Column(name = "is_click")
    public Boolean getIsClick() {
        return isClick;
    }

    public void setIsClick(Boolean isClick) {
        this.isClick = isClick;
    }

    @Basic
    @Column(name = "isp")
    public String getIsp() {
        return isp;
    }

    public void setIsp(String isp) {
        this.isp = isp;
    }

    @Basic
    @Column(name = "screen_size")
    public String getScreenSize() {
        return screenSize;
    }

    public void setScreenSize(String screenSize) {
        this.screenSize = screenSize;
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
        Tracking tracking = (Tracking) o;
        return id == tracking.id &&
                Objects.equals(campaignCode, tracking.campaignCode) &&
                Objects.equals(ipAddress, tracking.ipAddress) &&
                Objects.equals(ipReference, tracking.ipReference) &&
                Objects.equals(browserDevice, tracking.browserDevice) &&
                Objects.equals(os, tracking.os) &&
                Objects.equals(paths, tracking.paths) &&
                Objects.equals(params, tracking.params)&&
                Objects.equals(campaignId, tracking.campaignId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, campaignCode, ipAddress, ipReference, browserDevice, os, paths, params, campaignId);
    }


}
