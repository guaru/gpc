package com.gisnet.gpc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
       registry.addEndpoint("/api/socket-turnador")
      // .setAllowedOrigins("http://localhost:4200","https://gisnet-security-qtpbvzhgtn.dynamic-m.com:9093","http://192.168.200.89:8082",
       //                "http://192.168.200.89:8084")
       .setAllowedOriginPatterns("*")
       //.setAllowedOrigins("*")
       .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/api/turnador/");
        registry.setApplicationDestinationPrefixes("/api/socket");
    }
    
}
