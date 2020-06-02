package com.ghdc.sync.core.db;


import com.ghdc.sync.model.InCome;
import com.ghdc.sync.model.Tracking;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.Properties;

public class Connector {
    SessionFactory sessionFactory;

    public Connector(Properties properties) {
        this.sessionFactory = initConfig(properties).buildSessionFactory();
    }

    private Configuration initConfig(Properties properties) {
        Configuration configuration = new Configuration();
        configuration.setProperties(properties);
        configuration.addAnnotatedClass(Tracking.class);
        configuration.addAnnotatedClass(InCome.class);
        return configuration;
    }
}
