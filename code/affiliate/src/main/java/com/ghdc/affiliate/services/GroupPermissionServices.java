package com.ghdc.affiliate.services;

import com.ghdc.affiliate.core.db.CRUDService;
import com.ghdc.affiliate.core.entity.Audit;
import com.ghdc.affiliate.model.group.GroupPermission;
import com.ghdc.affiliate.model.permission.Permission;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SQLCriterion;
import org.hibernate.query.criteria.internal.CriteriaDeleteImpl;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaDelete;
import java.util.List;
import java.util.Optional;

@Service
public class GroupPermissionServices extends CRUDService<GroupPermission, Integer> {
    public List<GroupPermission> findByGroupId(String db, Integer groupId) {
        Session session = getSession(db);
        try {
            Criteria criteria = session.createCriteria(entityClass);
            criteria.add((Restrictions.eq("audit.delFlag", false)));
            criteria.add((Restrictions.eq("groupId", groupId)));
            List<GroupPermission> list = (List<GroupPermission>) criteria.list();
            session.close();
            return list;
        } catch (Exception e) {
            session.close();
            return null;
        }
    }

    public boolean deleteByGroupId(String db, Integer groupId) {
        Session session = getSession(db);
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            Criteria criteria = session.createCriteria(entityClass);
            criteria.add((Restrictions.eq("audit.delFlag", false)));
            criteria.add((Restrictions.eq("groupId", groupId)));
            List<GroupPermission> list = (List<GroupPermission>) criteria.list();
            int counter = list.size();
            for (int i = 0; i < counter; i++) {
                GroupPermission item = list.get(i);
                item.getAudit().setDelFlag(true);
                session.update(item);
                if (i % 100 == 0) {
                    session.flush();
                    session.clear();
                }
            }
            tx.commit();
            session.close();
            return true;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
            session.close();
            return false;
        }
    }

    public List<Permission> getPermissionByGroupId(String db, Integer groupId) {
        Session session = getSession(db);
        String sql = "SELECT P.* FROM " + db + ".group_permissions as GP " +
                "left join " + db + ".permissions as P on GP.permission_id = P.id " +
                "where P.del_flag = 0 and GP.del_flag=0 and GP.group_id=" + groupId;
        List<Permission> permissions = session.createNativeQuery(sql, Permission.class)
                .list();
        return permissions;
    }

}
