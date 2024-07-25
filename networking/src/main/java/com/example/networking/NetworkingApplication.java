package com.example.networking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class NetworkingApplication {

    public static void main(String[] args) {
        // Load environment variables
        Dotenv dotenv = Dotenv.load();
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        
        System.setProperty("saramin.api.key", dotenv.get("SARAMIN_API_KEY"));

        // Run the Spring Boot application
        SpringApplication.run(NetworkingApplication.class, args);
    }
}