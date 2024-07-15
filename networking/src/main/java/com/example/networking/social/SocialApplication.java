package com.example.networking.social;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class SocialApplication {

<<<<<<< HEAD:networking/src/main/java/com/example/networking/social/SocialApplication.java
	public static void main(String[] args) {
		SpringApplication.run(SocialApplication.class, args);
	}
=======
    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();
        System.setProperty("SARAMIN_API_KEY", dotenv.get("SARAMIN_API_KEY"));
        
        SpringApplication.run(NetworkingApplication.class, args);
    }

>>>>>>> YSJ:networking/src/main/java/com/example/networking/NetworkingApplication.java

}
