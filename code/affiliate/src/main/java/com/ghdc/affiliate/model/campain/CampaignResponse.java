package com.ghdc.affiliate.model.campain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
@NoArgsConstructor
public class CampaignResponse {
    private Integer id;
    private Integer partnerId;
    private String code;
    private String title;
    private String source;
    private Boolean isPostBack;
    private Integer type;
    private Timestamp timeUpdated;

    public CampaignResponse(Campaign campaign) {
        this.id = campaign.getId();
        this.partnerId = campaign.getPartnerId();
        this.code = campaign.getCode();
        this.title = campaign.getTitle();
        this.source = campaign.getSource();
        this.isPostBack = campaign.getIsPostBack();
        this.type = campaign.getType();
        this.timeUpdated = campaign.getAudit().getTimeUpdated();
    }
}
