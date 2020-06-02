package com.ghdc.affiliate.model.partner;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
public class PartnerResponse {
    private Integer id;
    private String code;
    private String name;
    private boolean status;
    private String description;
    private Timestamp timeUpdated;

    public PartnerResponse(Partner partner){
        this.id = partner.getId();
        this.code = partner.getCode();
        this.name = partner.getName();
        this.status = partner.isStatus();
        this.description = partner.getDescription();
        this.timeUpdated = partner.getAudit().getTimeUpdated();
    }
}
