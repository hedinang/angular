package com.ghdc.tracking.services;

import com.ghdc.tracking.core.db.CRUDService;
import com.ghdc.tracking.model.campain.Campaign;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CampaignServices extends CRUDService<Campaign, Integer> {
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
}
