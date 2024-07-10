package com.example.networking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class NetworkingApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();
        System.setProperty("SARAMIN_API_KEY", dotenv.get("SARAMIN_API_KEY"));
        SpringApplication.run(NetworkingApplication.class, args);
    }
}
