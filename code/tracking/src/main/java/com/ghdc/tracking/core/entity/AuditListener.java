package com.ghdc.tracking.core.entity;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.sql.Timestamp;

public class AuditListener {
 
    @PrePersist
    public void setCreatedOn(Auditable auditable) {
        Audit audit = auditable.getAudit();
 
        if(audit == null) {
            audit = new Audit();
            auditable.setAudit(audit);
        }
        audit.setDelFlag(false);
        audit.setTimeCreated(new Timestamp(System.currentTimeMillis()));
        audit.setTimeUpdated(new Timestamp(System.currentTimeMillis()));
//        audit.setCreatedBy(LoggedUser.get());
    }
 
    @PreUpdate
    public void setUpdatedOn(Auditable auditable) {
        Audit audit = auditable.getAudit();
        audit.setTimeUpdated(new Timestamp(System.currentTimeMillis()));
//        audit.setUpdatedBy(LoggedUser.get());
    }
}