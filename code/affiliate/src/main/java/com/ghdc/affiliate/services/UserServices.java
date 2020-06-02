package com.ghdc.affiliate.services;

import com.ghdc.affiliate.core.db.CRUDService;
import com.ghdc.affiliate.model.user.User;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class UserServices extends CRUDService<User, Integer> {

    @Override
    public Optional<User> create(Integer userId, String db, User entity) {
        String id = Integer.toHexString(new Random().nextInt()).toUpperCase();
        String hexTime = Long.toHexString(System.currentTimeMillis() / 1000).toUpperCase();
        entity.setCode(hexTime + id);
        entity.setIsActive(true);
        return super.create(userId, db, entity);
    }

    public Optional<User> findByUserName(String db, String userName) {
        Session session = getSession(db);
        try {
            Criteria criteria = session.createCriteria(entityClass);
            Criterion criterionIsDeleted = Restrictions.eq("audit.delFlag", false);
            Criterion criterionId = Restrictions.eq("userName", userName);
            LogicalExpression andExp = Restrictions.and(criterionId, criterionIsDeleted);
            criteria.add(andExp);
            User t = (User) criteria.uniqueResult();
            session.close();
            return Optional.ofNullable(t);
        } catch (Exception e) {
            session.close();
            return Optional.empty();
        }
    }

    public Optional<User> findByCode(String db, String code) {
        Session session = getSession(db);
        try {
            Criteria criteria = session.createCriteria(entityClass);
            Criterion criterionIsDeleted = Restrictions.eq("audit.delFlag", false);
            Criterion criterionId = Restrictions.eq("code", code);
            LogicalExpression andExp = Restrictions.and(criterionId, criterionIsDeleted);
            criteria.add(andExp);
            User t = (User) criteria.uniqueResult();
            session.close();
            return Optional.ofNullable(t);
        } catch (Exception e) {
            session.close();
            return Optional.empty();
        }
    }

    public Boolean locked(Integer userId, String db, User user) {
        user.setIsActive(false);
        User result = update(userId, db, user).orElse(null);
        return result != null;
    }

    public Boolean unlocked(Integer userId, String db, User user) {
        user.setIsActive(true);
        User result = update(userId, db, user).orElse(null);
        return result != null;
    }


}
