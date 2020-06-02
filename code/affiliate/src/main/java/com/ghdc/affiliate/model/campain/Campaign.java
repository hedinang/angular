package com.ghdc.affiliate.model.campain;

import com.ghdc.affiliate.core.entity.Audit;
import com.ghdc.affiliate.core.entity.AuditListener;
import com.ghdc.affiliate.core.entity.Auditable;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "campaigns")
@EntityListeners(AuditListener.class)
public class Campaign implements Auditable {
    private Integer id;
    private Integer partnerId;
    private Integer userId;
    private String code;
    private String title;
    private Integer type;
    private String source;
    private Boolean isPostBack;
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

    @Column(name = "partner_id")
    public Integer getPartnerId() {
        return partnerId;
    }

    public void setPartnerId(Integer partnerId) {
        this.partnerId = partnerId;
    }

    @Column(name = "user_id")
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "source")
    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    @Basic
    @Column(name = "type")
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Basic
    @Column(name = "is_postback")
    public Boolean getIsPostBack() {
        return isPostBack;
    }

    public void setIsPostBack(Boolean isPostBack) {
        this.isPostBack = isPostBack;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Campaign campaign = (Campaign) o;
        return id.equals(campaign.id) &&
                Objects.equals(title, campaign.title) &&
                Objects.equals(source, campaign.source);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, source);
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
