package com.project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // /** kullanın / yerine
                .allowedOrigins(
                        "http://localhost:5173",
                        "http://localhost:4173",
                        "http://16.171.161.26",
                        "http://16.171.161.26:8080",
                        "http://16.171.161.26:8081"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .allowedHeaders("*");
    }
}