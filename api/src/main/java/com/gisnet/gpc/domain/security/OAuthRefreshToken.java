package com.gisnet.gpc.domain.security;


import com.gisnet.gpc.constants.ConstantDomain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = ConstantDomain.COLL_REFRESH_TOKEN)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OAuthRefreshToken {
    
    @Id
    @Field(name = ConstantDomain.FIELD_TOKEN_ID)
    private String tokenId;
    @Field(name = ConstantDomain.FIELD_TOKEN)
    private byte[] token;
    @Field(name = ConstantDomain.FIELD_AUTHENTICATION)
    private byte[] authentication;

}
