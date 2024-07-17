package com.example.networking.job.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@ComponentScan(basePackages = "com.example.networking.job.config")
public class JobSecurityConfig {

    @Bean(name = "jobSecurityFilterChain")
    public SecurityFilterChain jobSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.disable()) // cors 설정 업데이트
            .csrf(csrf -> csrf.disable()) // csrf 설정 업데이트
            .authorizeHttpRequests(authorizeRequests -> 
                authorizeRequests
                    .requestMatchers("/api/**").permitAll()
                    .anyRequest().authenticated()
            );
        return http.build();
    }
}
