package com.ghdc.tracking.core.db;


import com.ghdc.tracking.model.Isp;
import com.ghdc.tracking.model.campain.Campaign;
import com.ghdc.tracking.model.income.InCome;
import com.ghdc.tracking.model.partner.Partner;
import com.ghdc.tracking.model.track.Tracking;
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
        configuration.addAnnotatedClass(Campaign.class);
        configuration.addAnnotatedClass(Partner.class);
        configuration.addAnnotatedClass(Tracking.class);
        configuration.addAnnotatedClass(InCome.class);
        configuration.addAnnotatedClass(Isp.class);
        return configuration;
    }
}
