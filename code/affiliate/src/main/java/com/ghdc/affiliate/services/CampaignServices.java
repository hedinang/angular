package com.ghdc.affiliate.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ghdc.affiliate.config.affiliate.AffiliateConfig;
import com.ghdc.affiliate.core.AffiliateRestTemplate;
import com.ghdc.affiliate.core.ESServices;
import com.ghdc.affiliate.core.PageRequest;
import com.ghdc.affiliate.core.db.CRUDService;
import com.ghdc.affiliate.core.res.PageResponse;
import com.ghdc.affiliate.model.campain.Campaign;
import com.ghdc.affiliate.model.campain.CampaignDetailRequest;
import com.ghdc.affiliate.model.campain.CampaignReportResponse;
import com.ghdc.affiliate.model.partner.Partner;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.BucketOrder;
import org.elasticsearch.search.aggregations.bucket.histogram.DateHistogramInterval;
import org.elasticsearch.search.aggregations.bucket.terms.IncludeExclude;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class CampaignServices extends CRUDService<Campaign, Integer> {
    @Autowired
    AffiliateRestTemplate affiliateRestTemplate;
    @Autowired
    AffiliateConfig affiliateConfig;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    ESServices esServices;
    @Autowired
    PartnerServices partnerServices;
    private static final String TMP_CODE = "UID_%s_%d";
    private static final String TMP_URL_COUNT = "%s/%s/_count";
    private static final String TMP_URL_SEARCH = "%s/%s/_search";

    @Override
    public Optional<Campaign> create(Integer userId, String db, Campaign entity) {
        String currentHex = Long.toHexString(System.nanoTime()).toUpperCase();
        int id = new Random().nextInt();
        entity.setCode(String.format(TMP_CODE, currentHex, id));
        return super.create(userId, db, entity);
    }

    public Optional<Campaign> read(String db, Integer userId, Integer id) {
        Session session = getSession(db);
        try {
            Criteria criteria = session.createCriteria(entityClass);
            Criterion criterionIsDeleted = Restrictions.eq("audit.delFlag", false);
            Criterion criterionId = Restrictions.eq("id", id);
            Criterion criterionUserId = Restrictions.eq("userId", userId);
            Conjunction andExp = Restrictions.and(criterionId, criterionIsDeleted, criterionUserId);
            criteria.add(andExp);
            Campaign t = (Campaign) criteria.uniqueResult();
            session.close();
            return Optional.ofNullable(t);
        } catch (Exception e) {
            session.close();
            return Optional.empty();
        }
    }

    public PageResponse<Campaign> getPage(String db, Integer userId, PageRequest pageRequest) {
        if (pageRequest.limit == null || pageRequest.limit == 0) pageRequest.limit = DEFAULT_LIMIT;
        if (pageRequest.page == null || pageRequest.page == 0) pageRequest.page = DEFAULT_LIMIT;

        Session session = getSession(db);
        Criteria criteria = session.createCriteria(entityClass);
        int realPage = pageRequest.page - 1;
        criteria.add((Restrictions.eq("audit.delFlag", false)));
        criteria.add((Restrictions.eq("userId", userId)));
        List<Campaign> data = criteria.list();
        int total = data.size();
        criteria.setFirstResult(realPage * pageRequest.limit);
        criteria.setMaxResults(pageRequest.limit);
        if (pageRequest.property != null && pageRequest.direction != null)
            switch (pageRequest.direction) {
                case "ASC": {
                    criteria.addOrder(Order.asc(pageRequest.property));
                    break;
                }
                case "DESC": {
                    criteria.addOrder(Order.desc(pageRequest.property));
                    break;
                }
                default: {
                    criteria.addOrder(Order.asc("id"));
                }
            }

        PageResponse<Campaign> pageResponse = new PageResponse<>();
        pageResponse.setList(data);
        pageResponse.setLimit(pageRequest.limit);
        pageResponse.setPage(pageRequest.page);
        pageResponse.setTotal(total);
        session.close();
        return pageResponse;
    }

    public List<Campaign> getAll(String db, Integer userId) {
        Session session = getSession(db);
        try {
            Criteria criteria = session.createCriteria(entityClass);
            criteria.add((Restrictions.eq("audit.delFlag", false)));
            criteria.add((Restrictions.eq("userId", userId)));
            List<Campaign> list = (List<Campaign>) criteria.list();
            session.close();
            return list;
        } catch (Exception e) {
            session.close();
            return null;
        }
    }

    public Optional<Campaign> findByCode(String db, String code) {
        Session session = getSession(db);
        try {
            Criteria criteria = session.createCriteria(entityClass);
            Criterion criterionIsDeleted = Restrictions.eq("audit.delFlag", false);
            Criterion criterionId = Restrictions.eq("code", code);
            LogicalExpression andExp = Restrictions.and(criterionId, criterionIsDeleted);
            criteria.add(andExp);
            Campaign t = (Campaign) criteria.uniqueResult();
            session.close();
            return Optional.ofNullable(t);
        } catch (Exception e) {
            session.close();
            return Optional.empty();
        }
    }

    public Optional<Campaign> findByCode(String db, Integer userId, String code) {
        Session session = getSession(db);
        try {
            Criteria criteria = session.createCriteria(entityClass);
            Criterion criterionIsDeleted = Restrictions.eq("audit.delFlag", false);
            Criterion criterionId = Restrictions.eq("code", code);
            Criterion criterionUserId = Restrictions.eq("userId", userId);
            Conjunction andExp = Restrictions.and(criterionId, criterionIsDeleted, criterionUserId);
            criteria.add(andExp);
            Campaign t = (Campaign) criteria.uniqueResult();
            session.close();
            return Optional.ofNullable(t);
        } catch (Exception e) {
            session.close();
            return Optional.empty();
        }
    }

    public List<CampaignReportResponse> reportCampaign(String db, Integer userId, Long timeFrom, Long timeTo) {
        List<Campaign> campaigns = getAll(db, userId);
        return campaigns.stream().map(campaign -> convertCampaignResponse(campaign, timeFrom, timeTo)).collect(Collectors.toList());
    }

    public CampaignReportResponse convertCampaignResponse(Campaign campaign, Long timeFrom, Long timeTo) {
        Partner partner = partnerServices.read(affiliateConfig.getDbDefault(), campaign.getPartnerId()).orElse(new Partner());
        CampaignReportResponse campaignReportResponse = new CampaignReportResponse();
        campaignReportResponse.id = campaign.getId();
        campaignReportResponse.partnerId = campaign.getPartnerId();
        campaignReportResponse.partnerName = partner.getName();
        campaignReportResponse.title = campaign.getTitle();
        campaignReportResponse.code = campaign.getCode();
        campaignReportResponse.source = campaign.getSource();
        campaignReportResponse.tracking = detailsTrackingByCampaign(campaign, timeFrom, timeTo);
        campaignReportResponse.income = detailsInComeByCampaign(campaign, timeFrom, timeTo);
        return campaignReportResponse;
    }

    private JsonNode detailsTrackingByCampaign(Campaign campaign, Long timeFrom, Long timeTo) {
        String url = String.format(TMP_URL_SEARCH, affiliateConfig.getEsUrl(), AffiliateConfig.INDEX_TRACKING);
        /*query*/
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        boolQuery.must(QueryBuilders.matchQuery("campaignId", campaign.getId()));
        boolQuery.must(QueryBuilders.matchQuery("audit.delFlag", false));
        if (timeFrom != null)
            boolQuery.must(QueryBuilders.rangeQuery("audit.timeCreated").gte(timeFrom));
        boolQuery.must(QueryBuilders.rangeQuery("audit.timeCreated").lte(timeTo));
        /*aggregation*/
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(boolQuery);
        List<AggregationBuilder> builderList = buildersTrackingAggs();
        builderList.forEach(searchSourceBuilder::aggregation);
        searchSourceBuilder.size(0);
        String result = affiliateRestTemplate.postForObject(url, searchSourceBuilder.toString(), String.class);
        try {
            assert result != null;
            JsonNode jsonNode = objectMapper.readTree(result);
            return jsonNode.findPath("aggregations");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    private JsonNode detailsInComeByCampaign(Campaign campaign, Long timeFrom, Long timeTo) {
        String url = String.format(TMP_URL_SEARCH, affiliateConfig.getEsUrl(), AffiliateConfig.INDEX_INCOME);
        /*query*/
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        boolQuery.must(QueryBuilders.matchQuery("campaignId", campaign.getId()));
        boolQuery.must(QueryBuilders.matchQuery("audit.delFlag", false));
        if (timeFrom != null)
            boolQuery.must(QueryBuilders.rangeQuery("audit.timeCreated").gte(timeFrom));
        boolQuery.must(QueryBuilders.rangeQuery("audit.timeCreated").lte(timeTo));
        /*aggregation*/
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(boolQuery);
        List<AggregationBuilder> builderList = buildersInComeAggs();
        builderList.forEach(searchSourceBuilder::aggregation);
        searchSourceBuilder.size(0);
        String result = affiliateRestTemplate.postForObject(url, searchSourceBuilder.toString(), String.class);
        try {
            assert result != null;
            JsonNode jsonNode = objectMapper.readTree(result);
            return jsonNode.findPath("aggregations");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    private List<AggregationBuilder> buildersTrackingAggs() {
        AggregationBuilder aggregationISP = AggregationBuilders
                .terms("isp")
                .field("isp.keyword")
                .missing("N/A")
                .order(BucketOrder.count(true))
                .includeExclude(new IncludeExclude(null, new String[]{"fake"}));
        AggregationBuilder aggregationOS = AggregationBuilders
                .terms("os")
                .field("os.keyword")
                .missing("N/A")
                .order(BucketOrder.count(true))
                .includeExclude(new IncludeExclude(new String[]{"android", "linux", "ios", "windows"}, null));
        AggregationBuilder aggregationClickNumber = AggregationBuilders
                .terms("clickNumber")
                .field("isClick");
        AggregationBuilder aggregationViewNumber = AggregationBuilders
                .terms("viewNumber")
                .field("campaignId");

        List<AggregationBuilder> builderList = new ArrayList<>();
        builderList.add(aggregationISP);
        builderList.add(aggregationOS);
        builderList.add(aggregationClickNumber);
        builderList.add(aggregationViewNumber);
        return builderList;
    }

    private List<AggregationBuilder> buildersInComeAggs() {
        AggregationBuilder aggregationType = AggregationBuilders
                .terms("type")
                .field("type.keyword")
                .order(BucketOrder.count(true));
        AggregationBuilder aggregationInCome = AggregationBuilders
                .sum("income")
                .field("price");
        List<AggregationBuilder> builderList = new ArrayList<>();
        builderList.add(aggregationType);
        builderList.add(aggregationInCome);
        return builderList;
    }

    public CampaignReportResponse detailsCampaign(Campaign campaign, long timeGte, long timeLte, DateHistogramInterval interval) {
        Partner partner = partnerServices.read(affiliateConfig.getDbDefault(), campaign.getPartnerId()).orElse(new Partner());
        CampaignReportResponse campaignReportResponse = new CampaignReportResponse();
        campaignReportResponse.id = campaign.getId();
        campaignReportResponse.partnerId = campaign.getPartnerId();
        campaignReportResponse.partnerName = partner.getName();
        campaignReportResponse.title = campaign.getTitle();
        campaignReportResponse.code = campaign.getCode();
        campaignReportResponse.source = campaign.getSource();
        campaignReportResponse.tracking = detailTrackingWithTime(campaign.getId(), timeGte, timeLte, interval);
        campaignReportResponse.income = detailInComeWithTime(campaign.getId(), timeGte, timeLte, interval);
        return campaignReportResponse;
    }

    private JsonNode detailInComeWithTime(Integer id, Long timeGte, Long timeLte, DateHistogramInterval interval) {
        String url = String.format(TMP_URL_SEARCH, affiliateConfig.getEsUrl(), AffiliateConfig.INDEX_INCOME);
        /*query*/
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        boolQuery.must(QueryBuilders.matchQuery("campaignId", id));
        boolQuery.must(QueryBuilders.matchQuery("audit.delFlag", false));
        if (timeGte != null)
            boolQuery.must(QueryBuilders.rangeQuery("audit.timeCreated").gte(timeGte));
        boolQuery.must(QueryBuilders.rangeQuery("audit.timeCreated").lte(timeLte));
        /*aggregation*/
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(boolQuery);
        List<AggregationBuilder> builderList = buildersInComeAggs();

        AggregationBuilder aggregationInCome = AggregationBuilders
                .sum("income")
                .field("price");
        AggregationBuilder aggregationType = AggregationBuilders
                .terms("type")
                .field("type.keyword")
                .order(BucketOrder.count(true));
        AggregationBuilder dateHisto = AggregationBuilders
                .dateHistogram("dateTime")
                .field("audit.timeCreated")
                .dateHistogramInterval(interval)
                .subAggregation(aggregationInCome)
                .subAggregation(aggregationType);


        builderList.add(dateHisto);
        builderList.forEach(searchSourceBuilder::aggregation);
        searchSourceBuilder.size(0);
        String result = affiliateRestTemplate.postForObject(url, searchSourceBuilder.toString(), String.class);
        try {
            assert result != null;
            JsonNode jsonNode = objectMapper.readTree(result);
            return jsonNode.findPath("aggregations");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    private JsonNode detailTrackingWithTime(Integer id, Long timeGte, Long timeLte, DateHistogramInterval interval) {
        String url = String.format(TMP_URL_SEARCH, affiliateConfig.getEsUrl(), AffiliateConfig.INDEX_TRACKING);
        /*query*/
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        boolQuery.must(QueryBuilders.matchQuery("campaignId", id));
        boolQuery.must(QueryBuilders.matchQuery("audit.delFlag", false));
        if (timeGte != null)
            boolQuery.must(QueryBuilders.rangeQuery("audit.timeCreated").gte(timeGte));
        boolQuery.must(QueryBuilders.rangeQuery("audit.timeCreated").lte(timeLte));
        /*aggregation*/
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(boolQuery);
        List<AggregationBuilder> builderList = buildersTrackingAggs();
        AggregationBuilder dateHisto = AggregationBuilders
                .dateHistogram("dateTime")
                .field("audit.timeCreated")
                .dateHistogramInterval(interval);
        builderList.add(dateHisto);
        builderList.forEach(searchSourceBuilder::aggregation);
        searchSourceBuilder.size(0);
        String result = affiliateRestTemplate.postForObject(url, searchSourceBuilder.toString(), String.class);
        try {
            assert result != null;
            JsonNode jsonNode = objectMapper.readTree(result);
            return jsonNode.findPath("aggregations");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
