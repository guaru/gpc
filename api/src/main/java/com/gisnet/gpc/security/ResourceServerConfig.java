package com.gisnet.gpc.security;

import java.util.Arrays;
import com.gisnet.gpc.constants.ConstantWebApi;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
        .antMatchers("/api/socket-turnador/**",
        "/api/turn/**",
        "/api/commun-public/**",
        "/api/account/validateConfirmation", 
        "/api/account/confirmation",
        "/api/account/recover",
        "/api/account/restorePassword",
        "/api/account/validateRecover",
        "/index.html", 
        "/webjars/**",
        "/js/**").permitAll()
        .anyRequest().authenticated()
        .and().cors().configurationSource(corsConfigurationSource());
    }

    @Bean 
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration config =  new CorsConfiguration();
       /// config.setAllowedOrigins(Arrays.asList("*"));
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(Arrays.asList("Content-Type","Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration(ConstantWebApi.ALL_URI, config);
        return source;
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter(){
        FilterRegistrationBean<CorsFilter> bean  = new FilterRegistrationBean<>(new CorsFilter(corsConfigurationSource()));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}
