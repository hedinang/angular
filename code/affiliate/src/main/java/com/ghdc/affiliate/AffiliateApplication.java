package com.ghdc.affiliate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;

@SpringBootApplication(exclude = WebMvcAutoConfiguration.class)
public class AffiliateApplication {

	public static void main(String[] args) {
		SpringApplication.run(AffiliateApplication.class, args);
	}
}
