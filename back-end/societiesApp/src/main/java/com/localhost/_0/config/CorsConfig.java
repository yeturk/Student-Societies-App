package com.localhost._0.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:5173",
                        "http://localhost:4173",
                        "http://13.48.59.18",
                        "http://13.48.59.18:8080",
                        "http://13.48.59.18:8081",
                        "http://societies-app.s3-website.eu-north-1.amazonaws.com"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // 1 saat boyunca ön kontrol (preflight) sonuçlarını önbelleğe alır
    }
}