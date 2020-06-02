package com.ghdc.tracking.model.partner;


import com.ghdc.tracking.core.entity.Audit;
import com.ghdc.tracking.core.entity.AuditListener;
import com.ghdc.tracking.core.entity.Auditable;

import javax.persistence.*;
import java.util.Objects;


@Entity
@Table(name = "partners")
@EntityListeners(AuditListener.class)
public class Partner implements Auditable {
    private Integer id;
    private String code;
    private String name;
    private boolean status;
    private String description;
    private String token;
    @Embedded
    private Audit audit;

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
    @Column(name = "status")
    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public Audit getAudit() {
        return audit;
    }

    @Override
    public void setAudit(Audit audit) {
        this.audit = audit;
    }


    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "token")
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Partner partner = (Partner) o;
        return id == partner.id &&
                status == partner.status &&
                Objects.equals(code, partner.code) &&
                Objects.equals(name, partner.name) &&
                Objects.equals(description, partner.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, name, status, description);
    }


}
