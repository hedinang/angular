package com.ghdc.affiliate.core.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Audit {
    private Boolean delFlag;
    private Integer userCreated;
    private Integer userUpdated;
    private Timestamp timeCreated;
    private Timestamp timeUpdated;

    @Basic
    @Column(name = "del_flag")
    public Boolean getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Boolean delFlag) {
        this.delFlag = delFlag;
    }

    @Column(name = "user_created")
    public Integer getUserCreated() {
        return userCreated;
    }

    public void setUserCreated(Integer userCreated) {
        this.userCreated = userCreated;
    }
    @Column(name = "user_updated")
    public Integer getUserUpdated() {
        return userUpdated;
    }


    public void setUserUpdated(Integer userUpdated) {
        this.userUpdated = userUpdated;
    }
    @Column(name = "time_created")
    public Timestamp getTimeCreated() {
        return timeCreated;
    }

    public void setTimeCreated(Timestamp timeCreated) {
        this.timeCreated = timeCreated;
    }

    @Column(name = "time_updated")
    public Timestamp getTimeUpdated() {
        return timeUpdated;
    }

    public void setTimeUpdated(Timestamp timeUpdated) {
        this.timeUpdated = timeUpdated;
    }
}
