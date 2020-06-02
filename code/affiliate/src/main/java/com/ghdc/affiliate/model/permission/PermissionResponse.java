package com.ghdc.affiliate.model.permission;

import java.sql.Timestamp;

public class PermissionResponse {
    public Integer id;
    public String code;
    public String name;
    public String descriptions;
    public Integer parentId;
    public Timestamp timeUpdated;

    public PermissionResponse(Permission permission){
        this.id = permission.getId();
        this.code = permission.getCode();
        this.name = permission.getName();
        this.descriptions = permission.getDescriptions();
        this.parentId = permission.getParentId();
        this.timeUpdated = permission.getAudit().getTimeUpdated();
    }
}
