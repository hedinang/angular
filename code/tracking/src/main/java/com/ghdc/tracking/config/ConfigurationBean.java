package com.ghdc.tracking.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ghdc.tracking.config.affiliate.AffiliateConfig;
import com.ghdc.tracking.config.rabbit.RabbitMQFactory;
import com.ghdc.tracking.core.AffiliateRestTemplate;
import com.ghdc.tracking.core.db.Connector;
import com.ghdc.tracking.core.db.ConnectorManager;
import com.ghdc.tracking.core.db.DialectSQL;
import com.ghdc.tracking.core.db.DataBaseProperties;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.amqp.RabbitProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import java.util.Properties;

@Configuration
public class ConfigurationBean {
    @Autowired
    RabbitProperties rabbitProperties;
    @Autowired
    AffiliateConfig affiliateConfig;
    @Bean
    public ConnectorManager createConnectors() {
        String database = affiliateConfig.getDbDefault();
        ConnectorManager connectorManager = new ConnectorManager();
        Properties properties = DataBaseProperties.createProperties(DialectSQL.MYSQL, database);
        Connector connector = new Connector(properties);
        connectorManager.addConnector(database, connector);
        System.out.println("Connected to database " + database);
        return connectorManager;
    }

    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitMQFactory rabbitMQFactory = new RabbitMQFactory();
        ConnectionFactory connectionFactory = rabbitMQFactory.connectionFactory(
                rabbitProperties.getHost(),
                rabbitProperties.getPort(),
                rabbitProperties.getUsername(),
                rabbitProperties.getPassword()
        );
        return new RabbitTemplate(connectionFactory);
    }
    @Bean
    public InternalResourceViewResolver defaultViewResolver() {
        return new InternalResourceViewResolver();
    }

    @Bean
    public AffiliateRestTemplate createAffiliateRestTemplate(){
        return new AffiliateRestTemplate();
    }

    @Bean
    public ObjectMapper createObjectMapper(){
        return new ObjectMapper();
    }
}

