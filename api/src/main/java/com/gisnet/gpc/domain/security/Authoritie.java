package com.gisnet.gpc.domain.security;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;

import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.common.GenericEntity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document (collection =  ConstantDomain.COLL_AUTHORITIES)
@Data
@NoArgsConstructor
public class Authoritie implements Serializable, GenericEntity<Authoritie> {

    @Id
    public String id;

    @NotEmpty
    @Field(name  = ConstantDomain.FIELD_NAME)
    private String name;

    @Field(name  = ConstantDomain.FIELD_ENABLED)
    private Boolean enabled;

    /**
    *
    */
    private static final long serialVersionUID = 1838967106789288412L;

    @Override
    public void update(Authoritie source) {
        this.name =  source.name;
        this.enabled =  source.enabled;
    }

    @Override
    public Authoritie createNewInstance() {
        Authoritie auth =  new Authoritie();
        auth.update(this);
        return auth;
    }

    @Override
    public void enabled(boolean enabled) {
        this.setEnabled(enabled);
    }

}
