package com.localhost._0.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(@org.jetbrains.annotations.NotNull CorsRegistry registry) {
        registry.addMapping("/")  // Tüm endpoint'ler için CORS'u aktif et
                .allowedOrigins(
                        "http://localhost:5173",  // sizin local development ortamınız
                        "http://localhost:4173",  // sizin local preview ortamınız
                        "http://16.171.161.26",   // AWS sunucusunun IP adresi
                        "http://16.171.161.26:8080",
                        "http://16.171.161.26:8081"  
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .allowedHeaders("*");
        }
}
