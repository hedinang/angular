package com.ghdc.sync.config;


import com.ghdc.sync.core.AffiliateRestTemplate;
import com.ghdc.sync.core.db.Connector;
import com.ghdc.sync.core.db.ConnectorManager;
import com.ghdc.sync.core.db.DialectSQL;
import com.ghdc.sync.core.db.DataBaseProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.util.Properties;

@Configuration
public class ConfigurationBean {

    @Bean
    public ConnectorManager createConnectors() {
        String database = "tracking";
        ConnectorManager connectorManager = new ConnectorManager();
        Properties properties = DataBaseProperties.createProperties(DialectSQL.MYSQL, database);
        Connector connector = new Connector(properties);
        connectorManager.addConnector(database, connector);
        System.out.println("Connected to database " + database);
        return connectorManager;
    }

    @Bean
    public AffiliateRestTemplate createRestTemplate(){
        return new AffiliateRestTemplate();
    }
}

