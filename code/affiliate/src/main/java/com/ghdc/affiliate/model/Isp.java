package com.ghdc.affiliate.model;

import com.ghdc.affiliate.core.entity.Audit;
import com.ghdc.affiliate.core.entity.AuditListener;
import com.ghdc.affiliate.core.entity.Auditable;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "isp")
@EntityListeners(AuditListener.class)
public class Isp implements Auditable {
    private int id;
    private String ip;
    private String isp;
    @Embedded
    private Audit audit;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "ip")
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Basic
    @Column(name = "isp")
    public String getIsp() {
        return isp;
    }

    public void setIsp(String isp) {
        this.isp = isp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Isp ips = (Isp) o;
        return id == ips.id &&
                Objects.equals(ip, ips.ip) &&
                Objects.equals(isp, ips.isp);

    }

    @Override
    public int hashCode() {
        return Objects.hash(id, ip, isp);
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
