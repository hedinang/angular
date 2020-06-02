package com.ghdc.affiliate.core.db;




import java.util.Properties;

import com.ghdc.affiliate.model.Isp;
import com.ghdc.affiliate.model.campain.Campaign;
import com.ghdc.affiliate.model.group.Group;
import com.ghdc.affiliate.model.group.GroupPermission;
import com.ghdc.affiliate.model.income.InCome;
import com.ghdc.affiliate.model.partner.Partner;
import com.ghdc.affiliate.model.permission.Permission;
import com.ghdc.affiliate.model.track.Tracking;
import com.ghdc.affiliate.model.user.User;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

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
        configuration.addAnnotatedClass(User.class);
        configuration.addAnnotatedClass(Tracking.class);
        configuration.addAnnotatedClass(InCome.class);
        configuration.addAnnotatedClass(Group.class);
        configuration.addAnnotatedClass(Permission.class);
        configuration.addAnnotatedClass(GroupPermission.class);
        configuration.addAnnotatedClass(Isp.class);
        return configuration;
    }
}
