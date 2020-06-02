package com.ghdc.tracking.core.entity;

public interface Auditable {
 
    Audit getAudit();
 
    void setAudit(Audit audit);
}