package com.example.networking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class NetworkingApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();
        String saraminApiKey = dotenv.get("SARAMIN_API_KEY");
        
        if (saraminApiKey != null) {
            System.setProperty("SARAMIN_API_KEY", saraminApiKey);
        } else {
            
            System.err.println("Error: SARAMIN_API_KEY is not set in .env file.");
            System.exit(1);
        }
        
        SpringApplication.run(NetworkingApplication.class, args);
    }
}
