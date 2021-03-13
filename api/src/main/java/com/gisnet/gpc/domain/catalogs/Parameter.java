package com.gisnet.gpc.domain.catalogs;

import com.querydsl.core.annotations.QueryEntity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.common.GenericEntity;

@QueryEntity
@Document(collection = ConstantDomain.COLL_PARAMETERS)
@Data
@NoArgsConstructor
public class Parameter  implements Serializable , GenericEntity<Parameter>{
    
    /**
     *
     */
    private static final long serialVersionUID = -3834926085982403428L;

    @Id
    private String id;

    @Field(value = ConstantDomain.FIELD_KEY)
    private String key;

    @Field(value= ConstantDomain.FIELD_VALUE)
    private String value;

    @Field(value = ConstantDomain.FIELD_ENABLED)
    private Boolean enabled;
    
    @Override
    public void update(Parameter source) {
        this.setKey(source.getKey());
        this.setValue(source.getValue());
        this.enabled(source.getEnabled());
    }

    @Override
    public void enabled(boolean enabled) {
      this.setEnabled(enabled);
    }

    @Override
    public String getId() {
        return this.getId();
    }

    @Override
    public Parameter createNewInstance() {
        Parameter  parameter =  new Parameter();
        parameter.update(this);
        return parameter;
    }
    
}
