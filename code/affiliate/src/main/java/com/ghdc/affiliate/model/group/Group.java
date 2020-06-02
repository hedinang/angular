package com.ghdc.affiliate.model.group;

import com.ghdc.affiliate.core.entity.Audit;
import com.ghdc.affiliate.core.entity.AuditListener;
import com.ghdc.affiliate.core.entity.Auditable;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "groups_")
@EntityListeners(AuditListener.class)
public class Group implements Auditable {
    private Integer id;
    private String code;
    private String name;
    private String descriptions;
    @Embedded
    private Audit audit;

    @Override
    public Audit getAudit() {
        return audit;
    }

    @Override
    public void setAudit(Audit audit) {
        this.audit = audit;
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "code")
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "descriptions")
    public String getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Group group = (Group) o;
        return id.equals(group.id) &&
                Objects.equals(code, group.code) &&
                Objects.equals(name, group.name) &&
                Objects.equals(descriptions, group.descriptions);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, name, descriptions);
    }
}
