package com.ghdc.affiliate.core;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ghdc.affiliate.config.affiliate.AffiliateConfig;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ESServices {
    @Autowired
    AffiliateConfig affiliateConfig;
    @Autowired
    AffiliateRestTemplate affiliateRestTemplate;
    @Autowired
    ObjectMapper objectMapper;
    Gson gson = new Gson();
    private static final int page_default = 1;
    private static final int limit_default = 10;
    private static final String key_sort = "es_sort";
    private static final String key_sort_order = "es_sort_order";
    private static final String key_like = "es_key_like";
    private static final String value_like = "es_value_like";
    private static final String key_page = "page";
    private static final String key_limit = "limit";

    public <T> List<T> findAll(String index, Map<String, Object> request, String[] excludeProperty, Class<T> clasz) throws IOException {
        ArrayList<T> items = new ArrayList<>();
        String url = String.format("%s/%s/_search/", affiliateConfig.getEsUrl(), index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        BoolQueryBuilder queryBuilder = searchAndBuilder(request);
        searchSourceBuilder.fetchSource(null, excludeProperty);
        if (request != null && request.containsKey(key_sort)) {
            SortOrder sortOrder = SortOrder.ASC;
            String direction = request.containsKey(key_sort_order) ? (String) request.get(key_sort_order) : "esc";
            if (direction.equals("desc"))
                sortOrder = SortOrder.DESC;
            searchSourceBuilder.sort((String) request.get(key_sort), sortOrder);
        }
        searchSourceBuilder.query(queryBuilder);
        searchSourceBuilder.size(10000);
        String body = searchSourceBuilder.toString();
        JsonNode jsonNode = objectMapper.readTree(affiliateRestTemplate.postForObject(url, body, String.class));
        JsonNode hits = jsonNode.path("hits").path("hits");
        for (JsonNode hit : hits) {
            JsonNode _source = hit.path("_source");
            T item = objectMapper.convertValue(_source, clasz) ;

            items.add(item);
        }
        return items;
    }

    @SuppressWarnings("unchecked")
    private BoolQueryBuilder searchAndBuilder(Object request) {
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        if (request != null) {
            Map<String, Object> mConditions = objectMapper.convertValue(request, Map.class);
            for (String key : mConditions.keySet()) {
                if (!key.equals(key_page)
                        && !key.equals(key_limit)
                        && !key.equals(key_sort)
                        && !key.equals(key_sort_order)
                        && !key.equals(key_like)
                        && !key.equals(value_like))
                    boolQueryBuilder.must(QueryBuilders.matchQuery(key, mConditions.get(key)));

                if (key.equals(key_like)) {
                    if (mConditions.containsKey(value_like)) {
                        Object valueLike = mConditions.get(value_like);
                        if (valueLike instanceof String && !((String) valueLike).isEmpty()) {
                            boolQueryBuilder.must(QueryBuilders.matchPhrasePrefixQuery((String) mConditions.get(key_like), valueLike));
                        } else if (valueLike instanceof Number) {
                            //todo tạm thời chưa cho search like theo số
//                        boolQueryBuilder.must(QueryBuilders.matchPhrasePrefixQuery((String) mConditions.get(key_like), valueLike));
                        }
                    }
                }
            }
        }
        boolQueryBuilder.must(QueryBuilders.matchQuery("audit.delFlag", false));
        return boolQueryBuilder;
    }


}
