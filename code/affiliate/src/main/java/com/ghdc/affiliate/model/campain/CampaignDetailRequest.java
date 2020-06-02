package com.ghdc.affiliate.model.campain;

import org.elasticsearch.search.aggregations.bucket.histogram.DateHistogramInterval;

public class CampaignDetailRequest {
    public Long timeFrom;
    public Long timeTo;
    public DateHistogramInterval interval;
}
