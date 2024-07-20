package com.example.networking.job.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration("jobSecurityConfig")
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain jobSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable()
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/api/**").permitAll() 
                    .anyRequest().authenticated()
            );
        return http.build();
    }
}
