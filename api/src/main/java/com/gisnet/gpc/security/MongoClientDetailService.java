package com.gisnet.gpc.security;

import java.util.List;

import com.gisnet.gpc.constants.ConstantDomain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.ClientRegistrationException;
import org.springframework.security.oauth2.provider.client.BaseClientDetails;
import org.springframework.stereotype.Service;

@Service("mongoClientDetailsService")
public class MongoClientDetailService implements ClientDetailsService {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    
    @Override
    public ClientDetails loadClientByClientId(String clientId) throws ClientRegistrationException {
       BaseClientDetails client = mongoTemplate.findOne(new Query(Criteria.where("clientId").is(clientId)), BaseClientDetails.class, ConstantDomain.COLL_CLIENT_DETAIILS);
        if(client==null){
            throw new RuntimeException ("no client information found");
        }
        return client;
    }


    public void addClientDetails(ClientDetails clientDetails) {
        mongoTemplate.insert(clientDetails, ConstantDomain.COLL_CLIENT_DETAIILS);
    }

    public void updateClientDetails(ClientDetails clientDetails) {
        Update update = new Update();
        update.set("resourceIds", clientDetails.getResourceIds());
        update.set("clientSecret", clientDetails.getClientSecret());
        update.set("authorizedGrantTypes", clientDetails.getAuthorizedGrantTypes());
        //update.set("registeredRedirectUris", clientDetails.getRegisteredRedirectUri());
        //update.set("authorities", clientDetails.getAuthorities());
        update.set("accessTokenValiditySeconds", clientDetails.getAccessTokenValiditySeconds());
        update.set("refreshTokenValiditySeconds", clientDetails.getRefreshTokenValiditySeconds());
        //update.set("additionalInformation", clientDetails.getAdditionalInformation());
        update.set("scope", clientDetails.getScope());
        mongoTemplate.updateFirst(new Query(Criteria.where("clientId").is(clientDetails.getClientId())), update,
                ConstantDomain.COLL_CLIENT_DETAIILS);
    }

    public void updateClientSecret(String clientId, String secret) {
        Update update = new Update();
        update.set("clientSecret", secret);
        mongoTemplate.updateFirst(new Query(Criteria.where("clientId").is(clientId)), update, 
                ConstantDomain.COLL_CLIENT_DETAIILS);
    }

    public void removeClientDetails(String clientId) {
        mongoTemplate.remove(new Query(Criteria.where("clientId").is(clientId)), ConstantDomain.COLL_CLIENT_DETAIILS);
    }

    public List<ClientDetails> listClientDetails() {
        return mongoTemplate.findAll(ClientDetails.class, ConstantDomain.COLL_CLIENT_DETAIILS);
    }
    
}
