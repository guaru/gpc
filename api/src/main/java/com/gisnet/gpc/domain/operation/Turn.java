package com.gisnet.gpc.domain.operation;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.catalogs.Area;
import com.gisnet.gpc.domain.catalogs.Office;
import com.gisnet.gpc.domain.security.User;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection =  ConstantDomain.COLL_TURNS)
@Data
@NoArgsConstructor
public class Turn implements Serializable {
     
     /**
      *
      */
     private static final long serialVersionUID = 1L;

     @Id
     private String id;   

     @TextIndexed
     @Field(value = ConstantDomain.FIELD_KEY)
     private String key;

     @TextIndexed
     @Field(value = ConstantDomain.FIELD_LASTNAME)
     private String lastName;

     @Field(value = ConstantDomain.FIELD_OFFICE)
     @Indexed(background = true)
     @NotNull
     private Office office;

     @Field(value = ConstantDomain.FIELD_AREA)
     @Indexed(background = true)
     @NotNull
     private Area area;

     @Field(value = ConstantDomain.FIELD_NUMBER)
     private Integer number;

     @Field(value = ConstantDomain.FIELD_CREATE)
     @DateTimeFormat(iso = ISO.DATE_TIME)
     private Date   createInstant;

     @Field(value = ConstantDomain.FIELD_ATTENDED_TIME)
     @DateTimeFormat(iso = ISO.DATE_TIME)
     private Date   attendedInstant;

     @Field(value = ConstantDomain.FIELD_DATE_CREATE)
     private String dateCreate;

     @Field(value = ConstantDomain.FIELD_USER_CREATE)
     private User userCreate;

     @Field(value = ConstantDomain.FIELD_IS_CLIENT)
     private Boolean isClient;
     
 
     @Field(value = ConstantDomain.FIELD_ATTENDED)
     private Boolean attended;

     @Field(value = ConstantDomain.FIELD_IN_ATTENTION)
     private Boolean inAttention;

     private Boolean sendSmsCreate;

     private Boolean sendSmsNext;

     @Field(value=ConstantDomain.FIELD_PHONE)
     private String phone;

     private Boolean inUse;
     
  




}
