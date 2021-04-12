package com.gisnet.gpc.domain.operation;

import com.gisnet.gpc.constants.ConstantDomain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value = ConstantDomain.COLL_SEQUENCES)
@Data
@NoArgsConstructor
public class Sequence {

    @Id
    private String id;

    @Field(value = ConstantDomain.FIELD_SEQUENCE)
    private Integer seq;

    @Field(value = ConstantDomain.FIELD_OFFICE_ID)
    private String officeId;
    
    @Field(value = ConstantDomain.FIELD_AREA_ID)
    private String areaId;

    @Field(value = ConstantDomain.FIELD_DATE)
    private String date;

    private Integer day;
     
    private Integer month;

    private Integer anio;


}
