package com.gisnet.gpc.domain.catalogs;

import com.gisnet.gpc.constants.ConstantDomain;
import com.querydsl.core.annotations.QueryEntity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

@QueryEntity
@Document(collection = ConstantDomain.COLL_MUNICIPALITIES)
@Data
@NoArgsConstructor
public class Municipality {
    @Id
    private String id;
    @Field(value  = ConstantDomain.FIELD_NAME)
    private String name;
    @Field(value  = ConstantDomain.FIELD_NUMBER_MUNICIPALITY)
    private String numberMunicipality;
    @Field(value  = ConstantDomain.FIELD_ENABLED)
    private Boolean enabled;

    @DBRef
    private State state;

}
