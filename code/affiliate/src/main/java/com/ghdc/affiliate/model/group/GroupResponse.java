package com.ghdc.affiliate.model.group;

import com.ghdc.affiliate.model.permission.PermissionResponse;

import java.sql.Timestamp;
import java.util.List;

public class GroupResponse {
    public Integer id;
    public String code;
    public String name;
    public String descriptions;
    public Timestamp timeUpdated;
    public List<PermissionResponse> permissions;
    public GroupResponse(Group group){
        this.id = group.getId();
        this.code = group.getCode();
        this.name = group.getName();
        this.descriptions = group.getDescriptions();
        this.timeUpdated = group.getAudit().getTimeUpdated();
    }
}
