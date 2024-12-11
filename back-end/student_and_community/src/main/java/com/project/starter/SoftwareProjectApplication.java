package com.project.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan(basePackages = {"com.project"})
@ComponentScan(basePackages = {"com.project"})
@EnableJpaRepositories(basePackages = {"com.project"})
@SpringBootApplication

public class SoftwareProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SoftwareProjectApplication.class, args);
	}

}
