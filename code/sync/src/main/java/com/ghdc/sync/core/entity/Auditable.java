package com.ghdc.sync.core.entity;

public interface Auditable {
 
    Audit getAudit();
 
    void setAudit(Audit audit);
}