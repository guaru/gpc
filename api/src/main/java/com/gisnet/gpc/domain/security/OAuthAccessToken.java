package com.gisnet.gpc.domain.security;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import com.gisnet.gpc.constants.ConstantDomain;

@Document(collection = ConstantDomain.COLL_ACCESS_TOKEN)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OAuthAccessToken {

    @Id
    @Field(name=ConstantDomain.FIELD_TOKEN_ID)
    private String tokenId;
    @Field(name = ConstantDomain.FIELD_TOKEN)
    private byte[] token;
    @Field(name = ConstantDomain.FIELD_AUTHENTICATION_ID)
    private String authenticationId;
    @Field(name = ConstantDomain.FIELD_USERNAME)
    private String username;
    @Field(name = ConstantDomain.FIELD_CLIENT_ID)
    private String clientId;
    @Field(name = ConstantDomain.FIELD_AUTHENTICATION)
    private byte[] authentication;
    @Field(name = ConstantDomain.FIELD_REFRESH_TOKEN)
    private String refreshToken;
    private Date date;
}
