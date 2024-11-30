package com.localhost._0.societiesApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan (basePackages = "com.localhost._0")
@EnableJpaRepositories(basePackages = "com.localhost._0")
@EntityScan (basePackages = "com.localhost._0")
public class SocietiesAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocietiesAppApplication.class, args);
	}

}
