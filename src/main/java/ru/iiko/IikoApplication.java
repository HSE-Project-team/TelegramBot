package ru.iiko;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
public class IikoApplication {

	public static void main(String[] args) {
		SpringApplication.run(IikoApplication.class, args);
	}

}
