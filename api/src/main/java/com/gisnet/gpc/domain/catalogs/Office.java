package com.gisnet.gpc.domain.catalogs;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotEmpty;

import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.common.GenericEntity;
import com.querydsl.core.annotations.QueryEntity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ENTITTY OFFICE
 * 
 * @author Alejandro Ventura
 * @since 29-01-2021
 */
@QueryEntity
@Document(collection = ConstantDomain.COLL_OFFICES)
@Data
@NoArgsConstructor
public class Office implements Serializable , GenericEntity<Office> {

    @Id
    private String id;
    
    @NotEmpty
    @Field(value  = ConstantDomain.FIELD_NAME)
    private String name;   
    @Field(value = ConstantDomain.FIELD_KEY)
    private String key;
    @Field(value  = ConstantDomain.FIELD_ADDRESS)
    private String address;
    @Field(value  = ConstantDomain.FIELD_ENABLED)
    private Boolean enabled;

    @DBRef
    private State state;

    @DBRef
    private List<Area> areas;

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Override
    public void update(Office source) {
        this.name =  source.name;
        this.key = source.key;
        this.address =  source.address;
        this.enabled =  source.enabled;
        this.state =  source.state;
    }

    @Override
    public Office createNewInstance() {
        Office office =  new Office();
         office.update(this);
        return office;
    }

    @Override
    public void enabled(boolean enabled) {
        this.setEnabled(enabled);
    }

}