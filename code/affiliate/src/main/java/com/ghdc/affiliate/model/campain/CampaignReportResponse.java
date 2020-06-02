package com.ghdc.affiliate.model.campain;

import com.fasterxml.jackson.databind.JsonNode;

public class CampaignReportResponse {
    public Integer id;
    public Integer partnerId;
    public String partnerName;
    public String code;
    public String title;
    public String source;
    public JsonNode tracking;
    public JsonNode income;
}
