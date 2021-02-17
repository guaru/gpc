package com.gisnet.gpc.security;

import java.util.Arrays;

import com.gisnet.gpc.constants.ConstantJwt;
import com.gisnet.gpc.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    @Qualifier("authenticationManager")
    private AuthenticationManager authenticationManager;

    @Autowired
    InfoAdditionalToken infoAdditionalToken;

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        security.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()");
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        TokenEnhancerChain tokenEnhancerChain = new TokenEnhancerChain();
        tokenEnhancerChain.setTokenEnhancers(Arrays.asList(infoAdditionalToken, accessTokenConverter()));

        endpoints.authenticationManager(authenticationManager).tokenStore(tokenStore())
                .accessTokenConverter(accessTokenConverter()).tokenEnhancer(tokenEnhancerChain);
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory().withClient(ConstantJwt.CLIENT_WEB).secret(passwordEncoder.encode(ConstantJwt.CLIENT_WEB_KEY))
                .scopes("read", "write").authorizedGrantTypes("password", "refresh_token")
                .accessTokenValiditySeconds(ConstantJwt.TOKEN_VALIDATION_SECCONDS)
                .refreshTokenValiditySeconds(ConstantJwt.REFRESH_TOKEN_VALIDATION).and()
                .withClient(ConstantJwt.CLIENT_APP).secret(passwordEncoder.encode(ConstantJwt.CLIENT_APP_KEY))
                .scopes("read", "write").authorizedGrantTypes("password", "refresh_token")
                .accessTokenValiditySeconds(ConstantJwt.TOKEN_VALIDATION_SECCONDS)
                .refreshTokenValiditySeconds(ConstantJwt.REFRESH_TOKEN_VALIDATION);
    }

    @Bean
    public JwtTokenStore tokenStore() {
        return new JwtTokenStore(accessTokenConverter());
    }

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        JwtAccessTokenConverter jwtAccessTokenConverter = new JwtAccessTokenConverter();
        jwtAccessTokenConverter.setSigningKey(Utils.getStringFromReourceFile(ConstantJwt.RSA_PRIVATE_KEY));
        jwtAccessTokenConverter.setVerifierKey(Utils.getStringFromReourceFile(ConstantJwt.RSA_PUBLIC_KEY));
        return jwtAccessTokenConverter;
    }

}
