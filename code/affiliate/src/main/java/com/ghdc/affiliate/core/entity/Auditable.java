package com.ghdc.affiliate.core.entity;

public interface Auditable {
 
    Audit getAudit();
 
    void setAudit(Audit audit);
}