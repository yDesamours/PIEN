package com.PEIN.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfiguration implements WebMvcConfigurer {
    @Value("${cors.allowed-origins}")
    private String allowedOrigin;
    @Override
    public void addCorsMappings(CorsRegistry corsRegistry){
        corsRegistry.addMapping("/**")
                .allowedOrigins(allowedOrigin)
                .allowedMethods("GET","POST","UPDATE","DELETE","PATCH","OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

}
