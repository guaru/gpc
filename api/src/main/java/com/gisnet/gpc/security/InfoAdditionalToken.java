package com.gisnet.gpc.security;

import java.util.HashMap;
import java.util.Map;

import com.gisnet.gpc.domain.security.User;
import com.gisnet.gpc.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

@Component
public class InfoAdditionalToken implements TokenEnhancer {

    @Autowired
    IUserService iUsuarioService;

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        User user = iUsuarioService.findByUserName(authentication.getName());
        Map<String, Object> info = new HashMap<>();
        info.put("firtName", user.getName());
        info.put("lastName", user.getLastName());
        info.put("email", user.getEmail());
        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
        return accessToken;
    }

}
