package com.example.networking.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.example.networking.security.custom.CustomUserDetailService;
import com.example.networking.security.jwt.filter.JwtAuthenticationFilter;
import com.example.networking.security.jwt.filter.JwtRequestFilter;
import com.example.networking.security.jwt.provider.JwtTokenProvider;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfigLogin {

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        log.info("시큐리티 설정...");

        http.formLogin(formLoginConfigurer -> formLoginConfigurer.disable())
            .httpBasic(httpBasicConfigurer -> httpBasicConfigurer.disable())
            .csrf(csrfConfigurer -> csrfConfigurer.disable())
            .cors(corsConfigurer -> {
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowCredentials(true);
                config.addAllowedOrigin("http://localhost:3000");
                config.addAllowedHeader("*");
                config.addAllowedMethod("*");
                source.registerCorsConfiguration("/**", config);
                corsConfigurer.configurationSource(source);
            });

        http.addFilterAt(new JwtAuthenticationFilter(authenticationManagerBean(), jwtTokenProvider),
                    UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new JwtRequestFilter(jwtTokenProvider),
                    UsernamePasswordAuthenticationFilter.class);

        http.authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                    .requestMatchers("/", "/login", "/users/**").permitAll()
                    .requestMatchers("/admin/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
            );

        http.userDetailsService(customUserDetailService);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
