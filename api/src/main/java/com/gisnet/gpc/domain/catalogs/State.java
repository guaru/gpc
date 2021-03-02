package com.gisnet.gpc.domain.catalogs;

import java.io.Serializable;

import com.gisnet.gpc.constants.ConstantDomain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <h1>State</h1>
 * <p>
 * Entity for states
 * </p>
 * 
 * @author Alejandro Ventura
 * @since 29-01-2021
 */
@Document(collection =  ConstantDomain.COLL_STATES)
@Data
@NoArgsConstructor
public class State implements Serializable {

    @Id
    private String id;
    @Field(value  = ConstantDomain.FIELD_NAME)
    private String name;
    @Field(value  = ConstantDomain.FIELD_NUMBER_ESTATE)
    private String numberState;
    @Field(value  = ConstantDomain.FIELD_ENABLED)
    private Boolean enabled;

    /**
     *
     */
    private static final long serialVersionUID = -2526567401617497568L;

}
