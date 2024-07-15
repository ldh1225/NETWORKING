package com.example.networking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.networking"})
@EnableJpaRepositories(basePackages = {"com.example.networking"})
public class NetworkingApplication {

    public static void main(String[] args) {
        SpringApplication.run(NetworkingApplication.class, args);
    }
}
