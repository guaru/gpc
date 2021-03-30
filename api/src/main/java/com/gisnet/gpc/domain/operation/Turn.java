package com.gisnet.gpc.domain.operation;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Id;
import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.catalogs.Office;
import com.gisnet.gpc.domain.security.User;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection =  ConstantDomain.COLL_TURNS)
@Data
@NoArgsConstructor
public class Turn  {
     
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
     private Office office;

     @Field(value = ConstantDomain.FIELD_NUMBER)
     private Integer number;

     @Field(value = ConstantDomain.FIELD_CREATE)
     private Long create;

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


}
