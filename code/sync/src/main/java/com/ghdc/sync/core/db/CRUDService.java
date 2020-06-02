package com.ghdc.sync.core.db;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ghdc.sync.core.AffiliateRestTemplate;
import com.ghdc.sync.core.entity.Audit;
import com.ghdc.sync.core.entity.Auditable;
import com.ghdc.sync.core.res.PageResponse;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaUpdate;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class CRUDService<T extends Auditable, ID extends Serializable> {
    public Class<T> entityClass;
    @Autowired
    ConnectorManager connectorManager;
    @Autowired
    protected AffiliateRestTemplate affiliateRestTemplate;
    @Value("${urlES}")
    public String urlES;
    protected ObjectMapper objectMapper = new ObjectMapper();
    @SuppressWarnings("unchecked")
    public CRUDService() {
        this.entityClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
                .getActualTypeArguments()[0];
    }

    public Session getSession(String idSession) {
        return connectorManager.openSessionById(idSession);
    }

    public Optional<T> create(Integer userId, String db, T entity) {
        Session session = getSession(db);
        Transaction transaction = session.getTransaction();
        try {
            transaction.begin();
            Audit audit = new Audit();
            audit.setUserCreated(userId);
            audit.setUserUpdated(userId);
            entity.setAudit(audit);
            Object key = session.save(entity);
            transaction.commit();
            session.clear();
            T t = session.find(entityClass, key);
            session.close();
            return Optional.ofNullable(t);
        } catch (Exception e) {
            transaction.rollback();
            session.close();
            return Optional.empty();
        }
    }

    @SuppressWarnings("unchecked")
    public Optional<T> read(String db, ID id) {
        Session session = getSession(db);
        try {
            Criteria criteria = session.createCriteria(entityClass);
            Criterion criterionIsDeleted = Restrictions.eq("audit.delFlag", false);

            Criterion criterionId = Restrictions.eq("id", id);
            LogicalExpression andExp = Restrictions.and(criterionId, criterionIsDeleted);
            criteria.add(andExp);
            T t = (T) criteria.uniqueResult();
            session.close();
            return Optional.ofNullable(t);
        } catch (Exception e) {
            session.close();
            return Optional.empty();
        }
    }

    public Optional<T> update(Integer userId, String db, T entity) {
        Session session = getSession(db);
        Transaction transaction = session.getTransaction();
        try {
            transaction.begin();
            entity.getAudit().setUserUpdated(userId);
            session.update(entity);
            transaction.commit();
            session.close();
            return Optional.ofNullable(entity);
        } catch (Exception e) {
            transaction.rollback();
            session.close();
            return Optional.empty();
        }
    }

    public boolean update(String db, Map<String, Object> where, Map<String, Object> value) {
        Session session = getSession(db);
        Transaction transaction = session.getTransaction();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaUpdate<T> criteria = builder.createCriteriaUpdate(entityClass);
        Root<T> root = criteria.from(entityClass);

        for (String key : value.keySet()) {
            criteria.set(root.get(key), value.get(key));
        }
        Expression<Boolean> filterPredicate = null;

        for (String key : where.keySet()) {
            if (filterPredicate == null) {
                filterPredicate = builder.equal(root.get(key), where.get(key));
            } else {
                filterPredicate = builder.and(filterPredicate, builder.equal(root.get(key), where.get(key)));
            }
        }

        criteria.where(filterPredicate);
        try {
            transaction.begin();
            session.createQuery(criteria).executeUpdate();
            transaction.commit();
            session.close();
            return true;
        } catch (Exception e) {
            transaction.rollback();
            session.close();
            return false;
        }
    }

    public Optional<Boolean> delete(String db, T entity) {
        assert (entity != null);
        Session session = getSession(db);
        Transaction transaction = session.getTransaction();
        try {
            transaction.begin();
            entity.getAudit().setDelFlag(true);
            session.update(entity);
            transaction.commit();
            session.close();
            return Optional.of(true);
        } catch (Exception e) {
            transaction.rollback();
            session.close();
            return Optional.of(false);
        }
    }

    @SuppressWarnings("unchecked")
    public PageResponse<T> getPage(String db, int page, int limit, String direction, String property) {
        Session session = getSession(db);
        Criteria criteria = session.createCriteria(entityClass);
        int realPage = page - 1;
        criteria.add((Restrictions.eq("audit.delFlag", false)));
        List<T> data = criteria.list();
        int total = data.size();
        criteria.setFirstResult(realPage * limit);
        criteria.setMaxResults(limit);

        switch (direction) {
            case "ASC": {
                criteria.addOrder(Order.asc(property));
                break;
            }
            case "DESC": {
                criteria.addOrder(Order.desc(property));
                break;
            }
            default: {

            }
        }

        PageResponse<T> pageResponse = new PageResponse<T>(data, page, total);
        session.close();
        return pageResponse;
    }

    @SuppressWarnings("unchecked")
    public List<T> getAll(String db) {
        Session session = getSession(db);
        try {
            Criteria criteria = session.createCriteria(entityClass);
            criteria.add((Restrictions.eq("audit.delFlag", false)));
            List<T> list = (List<T>) criteria.list();
            session.close();
            return list;
        } catch (Exception e) {
            session.close();
            return null;
        }
    }
}