package com.ghdc.affiliate.model.group;

import com.ghdc.affiliate.core.entity.Audit;
import com.ghdc.affiliate.core.entity.AuditListener;
import com.ghdc.affiliate.core.entity.Auditable;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "group_permissions")
@EntityListeners(AuditListener.class)
public class GroupPermission implements Auditable {
    private int id;
    private int groupId;
    private int permissionId;
    @Embedded
    private Audit audit;
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "group_id")
    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    @Basic
    @Column(name = "permission_id")
    public int getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(int permissionId) {
        this.permissionId = permissionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GroupPermission that = (GroupPermission) o;
        return id == that.id &&
                groupId == that.groupId &&
                permissionId == that.permissionId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, groupId, permissionId);
    }

    @Override
    public Audit getAudit() {
        return audit;
    }

    @Override
    public void setAudit(Audit audit) {
        this.audit = audit;
    }
}
