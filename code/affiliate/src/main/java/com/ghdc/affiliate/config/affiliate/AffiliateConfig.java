package com.ghdc.affiliate.config.affiliate;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "affiliate")
public class AffiliateConfig {
    private String dbDefault;
    private String[] allowEndpoint;
    public static final String INDEX_TRACKING = "tracking";
    public static final String INDEX_INCOME = "income";
    public static final int TYPE_REGISTER = 1;
    public static final int TYPE_CANCEL= 2;
    public static final int TYPE_RENEW = 3;
    public static final int TYPE_MOFEE = 4;


    public String getEsUrl() {
        return esUrl;
    }

    public void setEsUrl(String esUrl) {
        this.esUrl = esUrl;
    }

    private String esUrl;

    public String[] getAllowEndpoint() {
        return allowEndpoint;
    }

    public void setAllowEndpoint(String[] allowEndpoint) {
        this.allowEndpoint = allowEndpoint;
    }

    public String getDbDefault() {
        return dbDefault;
    }

    public void setDbDefault(String dbDefault) {
        this.dbDefault = dbDefault;
    }
}
