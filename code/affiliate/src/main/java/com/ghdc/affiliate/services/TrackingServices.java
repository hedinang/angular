package com.ghdc.affiliate.services;

import com.ghdc.affiliate.core.db.CRUDService;
import com.ghdc.affiliate.model.campain.Campaign;
import com.ghdc.affiliate.model.track.Tracking;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import javax.sound.midi.Track;
import java.util.List;
import java.util.Optional;

@Service
public class TrackingServices extends CRUDService<Tracking, Long> {
    public Tracking setIsClick(String db, Tracking tracking) {
        tracking.setIsClick(true);
        return update(null, db, tracking).orElse(null);
    }

    public Optional<Tracking> findBySessionId(String db, String sessionId) {
        Session session = getSession(db);
        try {
            Criteria criteria = session.createCriteria(entityClass);
            Criterion criterionIsDeleted = Restrictions.eq("audit.delFlag", false);
            Criterion criterionId = Restrictions.eq("sessionTracking", sessionId);
            LogicalExpression andExp = Restrictions.and(criterionId, criterionIsDeleted);
            criteria.add(andExp);
            Tracking tracking = (Tracking) criteria.uniqueResult();
            session.close();
            return Optional.ofNullable(tracking);
        } catch (Exception e) {
            session.close();
            return Optional.empty();
        }
    }

}
