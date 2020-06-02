package com.ghdc.affiliate.model.permission;

import org.springframework.lang.Nullable;

public class PermissionRequest {
    public String code;
    public String name;
    public String descriptions;
    @Nullable
    public Integer parentId;
}
