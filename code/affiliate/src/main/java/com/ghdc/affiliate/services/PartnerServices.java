package com.ghdc.affiliate.services;

import com.ghdc.affiliate.core.db.CRUDService;
import com.ghdc.affiliate.model.partner.Partner;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PartnerServices extends CRUDService<Partner, Integer> {
    @Override
    public Optional<Partner> create(Integer userId, String db, Partner entity) {
        entity.setStatus(true);
        entity.setCode(Long.toHexString(System.nanoTime()).toUpperCase());
        return super.create(userId, db, entity);
    }

    public Optional<Partner> findByCode(String db, String code){
        Session session = getSession(db);
        try {
            Criteria criteria = session.createCriteria(entityClass);
            Criterion criterionIsDeleted = Restrictions.eq("audit.delFlag", false);
            Criterion criterionId = Restrictions.eq("code", code);
            LogicalExpression andExp = Restrictions.and(criterionId, criterionIsDeleted);
            criteria.add(andExp);
            Partner t = (Partner) criteria.uniqueResult();
            session.close();
            return Optional.ofNullable(t);
        } catch (Exception e) {
            session.close();
            return Optional.empty();
        }
    }
}
