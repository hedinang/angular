package com.ghdc.affiliate.model.track;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
public class TrackingResponse {
    private Long id;
    private String campaignCode;
    private String sessionTracking;
    private String ipAddress;
    private String ipReference;
    private String modelDevice;
    private String os;
    private String paths;
    private String params;
    private Boolean isClick;
    private String isp;
    private String screenSize;
    private Timestamp timeUpdated;
    public TrackingResponse(Tracking tracking){
        this.id = tracking.getId();
        this.campaignCode = tracking.getCampaignCode();
        this.sessionTracking = tracking.getSessionTracking();
        this.ipAddress = tracking.getIpAddress();
        this.ipReference = tracking.getIpReference();
        this.modelDevice = tracking.getBrowserDevice();
        this.os = tracking.getOs();
        this.paths = tracking.getPaths();
        this.params = tracking.getParams();
        this.isClick = tracking.getIsClick();
        this.isp = tracking.getIsp();
        this.screenSize = tracking.getScreenSize();
        this.timeUpdated = tracking.getAudit().getTimeUpdated();
    }
}
