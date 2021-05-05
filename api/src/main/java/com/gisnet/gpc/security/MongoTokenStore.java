package com.gisnet.gpc.security;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import com.gisnet.gpc.constants.ConstantDomain;
import com.gisnet.gpc.domain.security.OAuthAccessToken;
import com.gisnet.gpc.domain.security.OAuthRefreshToken;

import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2RefreshToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.AuthenticationKeyGenerator;
import org.springframework.security.oauth2.provider.token.DefaultAuthenticationKeyGenerator;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.stereotype.Service;
import org.springframework.security.oauth2.common.util.SerializationUtils;

@Service("mongoTokenStore")
public class MongoTokenStore  implements TokenStore {

    @Autowired MongoTemplate mongoTemplate;
  
    private AuthenticationKeyGenerator authenticationKeyGenerator = new DefaultAuthenticationKeyGenerator();

    public AuthenticationKeyGenerator getAuthenticationKeyGenerator() {
        return authenticationKeyGenerator;
    }

    public void setAuthenticationKeyGenerator(AuthenticationKeyGenerator authenticationKeyGenerator) {
        this.authenticationKeyGenerator = authenticationKeyGenerator;
    }

    public OAuth2Authentication readAuthentication(OAuth2AccessToken token) {
        return readAuthentication(token.getValue());
    }

    public OAuth2Authentication readAuthentication(String token) {
        OAuth2Authentication authentication = null;
        OAuthAccessToken oauthAccessToken = mongoTemplate.findOne(
                new Query(Criteria.where(ConstantDomain.FIELD_TOKEN_ID).is(extractTokenKey(token))), 
                OAuthAccessToken.class,
                ConstantDomain.COLL_ACCESS_TOKEN);
                
        if (oauthAccessToken != null) {
            authentication = deserializeAuthentication(oauthAccessToken.getAuthentication());
        }
        return authentication;
    }

    public void storeAccessToken(OAuth2AccessToken token, OAuth2Authentication authentication) {
        String refreshToken = null;
        if (token.getRefreshToken() != null) {
            refreshToken = token.getRefreshToken().getValue();
        }

        if (readAccessToken(token.getValue()) != null) {
            removeAccessToken(token.getValue());
        }

        OAuthAccessToken oauthAccessToken = new OAuthAccessToken();
        oauthAccessToken.setTokenId(extractTokenKey(token.getValue()));
        oauthAccessToken.setToken(serializeAccessToken(token));
        oauthAccessToken.setAuthenticationId(authenticationKeyGenerator.extractKey(authentication));
        oauthAccessToken.setUsername(authentication.isClientOnly() ? null : authentication.getName());
        oauthAccessToken.setClientId(authentication.getOAuth2Request().getClientId());
        oauthAccessToken.setAuthentication(serializeAuthentication(authentication));
        oauthAccessToken.setRefreshToken(extractTokenKey(refreshToken));
        oauthAccessToken.setDate(new Date());

        mongoTemplate.insert(oauthAccessToken, ConstantDomain.COLL_ACCESS_TOKEN);
    }

    public OAuth2AccessToken readAccessToken(String tokenValue) {
        OAuth2AccessToken accessToken = null;
        OAuthAccessToken oauthAccessToken = mongoTemplate.findOne(
                new Query(Criteria.where(ConstantDomain.FIELD_TOKEN_ID).is(extractTokenKey(tokenValue))), 
                OAuthAccessToken.class,
                ConstantDomain.COLL_ACCESS_TOKEN);
        if (oauthAccessToken != null) {
            accessToken = deserializeAccessToken(oauthAccessToken.getToken());
        }
        return accessToken;
    }

    public void removeAccessToken(OAuth2AccessToken token) {
        removeAccessToken(token.getValue());
    }

    public void removeAccessToken(String tokenValue) {
        mongoTemplate.remove(new Query(Criteria.where(ConstantDomain.FIELD_TOKEN_ID).is(extractTokenKey(tokenValue))),
                ConstantDomain.COLL_ACCESS_TOKEN);
    }

    public void storeRefreshToken(OAuth2RefreshToken refreshToken, OAuth2Authentication authentication) {
        OAuthRefreshToken oauthRefreshToken = new OAuthRefreshToken();
        oauthRefreshToken.setTokenId(extractTokenKey(refreshToken.getValue()));
        oauthRefreshToken.setToken(serializeRefreshToken(refreshToken));
        oauthRefreshToken.setAuthentication(serializeAuthentication(authentication));

        mongoTemplate.insert(oauthRefreshToken, ConstantDomain.COLL_REFRESH_TOKEN);
    }

    public OAuth2RefreshToken readRefreshToken(String tokenValue) {
        OAuth2RefreshToken refreshToken = null;
        OAuthRefreshToken oauthRefreshToken = mongoTemplate.findOne(
                new Query(Criteria.where(ConstantDomain.FIELD_TOKEN_ID).is(extractTokenKey(tokenValue))), 
                OAuthRefreshToken.class,
                ConstantDomain.COLL_REFRESH_TOKEN);
        if (oauthRefreshToken != null) {
            refreshToken = deserializeRefreshToken(oauthRefreshToken.getToken());
        }
        return refreshToken;
    }

    public OAuth2Authentication readAuthenticationForRefreshToken(OAuth2RefreshToken token) {
        return readAuthenticationForRefreshToken(token.getValue());
    }

    public OAuth2Authentication readAuthenticationForRefreshToken(String value) {
        OAuth2Authentication authentication = null;
        OAuthRefreshToken oauthRefreshToken = mongoTemplate.findOne(
                new Query(Criteria.where(ConstantDomain.FIELD_TOKEN_ID).is(extractTokenKey(value))), 
                OAuthRefreshToken.class,
                ConstantDomain.COLL_REFRESH_TOKEN);
        if (oauthRefreshToken != null) {
            authentication = deserializeAuthentication(oauthRefreshToken.getAuthentication());
        }
        return authentication;
    }

    public void removeRefreshToken(OAuth2RefreshToken token) {
        removeRefreshToken(token.getValue());
    }

    public void removeRefreshToken(String token) {
        mongoTemplate.remove(new Query(Criteria.where(ConstantDomain.FIELD_TOKEN_ID).is(extractTokenKey(token))),
                ConstantDomain.COLL_REFRESH_TOKEN);
    }

    public void removeAccessTokenUsingRefreshToken(OAuth2RefreshToken refreshToken) {
        removeAccessTokenUsingRefreshToken(refreshToken.getValue());
    }

    public void removeAccessTokenUsingRefreshToken(String refreshToken) {
        mongoTemplate.remove(new Query(Criteria.where(ConstantDomain.FIELD_REFRESH_TOKEN).is(extractTokenKey(refreshToken))),
                ConstantDomain.COLL_REFRESH_TOKEN);
    }

    public OAuth2AccessToken getAccessToken(OAuth2Authentication authentication) {
        String key = authenticationKeyGenerator.extractKey(authentication);
        OAuth2AccessToken accessToken = null;
        OAuthAccessToken oauthAccessToken = mongoTemplate.findOne(
                new Query(Criteria.where(ConstantDomain.FIELD_AUTHENTICATION_ID).is(key)), OAuthAccessToken.class, ConstantDomain.COLL_ACCESS_TOKEN);
        if (oauthAccessToken != null) {
            accessToken = deserializeAccessToken(oauthAccessToken.getToken());
        }
        return accessToken;
    }

    public Collection<OAuth2AccessToken> findTokensByClientIdAndUserName(String clientId, String userName) {
        Query query = new Query();
        query.addCriteria(Criteria.where(ConstantDomain.FIELD_CLIENT_ID).is(clientId));
        query.addCriteria(Criteria.where(ConstantDomain.FIELD_USERNAME));
        List<OAuthAccessToken> tokenList = mongoTemplate.findAllAndRemove(query, 
                OAuthAccessToken.class,
                ConstantDomain.COLL_ACCESS_TOKEN);

        Collection<OAuth2AccessToken> collection = new ArrayList<OAuth2AccessToken>();
        if (!(tokenList == null || tokenList.isEmpty())) {
            for (OAuthAccessToken oauthAccessToken : tokenList) {
                collection.add(deserializeAccessToken(oauthAccessToken.getToken()));
            }
        }
        return collection;
    }

    public Collection<OAuth2AccessToken> findTokensByClientId(String clientId) {
        Query query = new Query();
        query.addCriteria(Criteria.where(ConstantDomain.FIELD_CLIENT_ID).is(clientId));
        List<OAuthAccessToken> tokenList = mongoTemplate.findAllAndRemove(query, 
                OAuthAccessToken.class,
                ConstantDomain.COLL_ACCESS_TOKEN);
        Collection<OAuth2AccessToken> collection = new ArrayList<OAuth2AccessToken>();
        if (!(tokenList == null || tokenList.isEmpty())) {
            for (OAuthAccessToken oauthAccessToken : tokenList) {
                collection.add(deserializeAccessToken(oauthAccessToken.getToken()));
            }
        }
        return collection;
    }

    protected byte[] serializeAccessToken(OAuth2AccessToken token) {
        return SerializationUtils.serialize(token);
    }

    protected byte[] serializeRefreshToken(OAuth2RefreshToken token) {
        return SerializationUtils.serialize(token);
    }

    protected byte[] serializeAuthentication(OAuth2Authentication authentication) {
        return SerializationUtils.serialize(authentication);
    }

    protected OAuth2AccessToken deserializeAccessToken(byte[] token) {
        return SerializationUtils.deserialize(token);
    }

    protected OAuth2RefreshToken deserializeRefreshToken(byte[] token) {
        return SerializationUtils.deserialize(token);
    }

    protected OAuth2Authentication deserializeAuthentication(byte[] authentication) {
        return SerializationUtils.deserialize(authentication);
    }

    protected String extractTokenKey(String value) {
        if (value == null) {
            return null;
        }
        return value;
        /*MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("base64");
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("MD5 algorithm not available.  Fatal (should be in the JDK).");
        }

        try {
            byte[] bytes = digest.digest(value.getBytes("UTF-8"));
            return String.format("%032x", new BigInteger(1, bytes));
        } catch (UnsupportedEncodingException e) {
            throw new IllegalStateException("UTF-8 encoding not available.  Fatal (should be in the JDK).");
        }*/
    }
}