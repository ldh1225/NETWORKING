package com.example.networking.config;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.networking.security.jwt.flter.JwtRequestFilter;

// SpringSecurity 5.4 이하
// @EnableWebSecurity
// public class SecurityConfig extends WebSecurityConfigurerAdapter {
@Slf4j
@Configuration
@EnableWebSecurity
// @preAuthorize, @postAuthorize, @Secured 활성화
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig {

    @Autowired
    private CustomerDetailService customUserDetailService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // 시큐리티 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        log.info("시큐리티 설정...");

        // 폼 기반 로그인 비활성화
        http.formLogin( login -> login.disable() );

        // HTTP 기본 인증 비활성화
        http.httpBasic( basic -> basic.disable() );

        // CSRF (Cross-Site Request Forgery) 공격 방어 기능 비활성화
        http.csrf( csrf -> csrf.disable() );

        // 필터 설정
        http.addFilterAt(new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new JwtRequestFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
            ;
 
        // 인가 설정
        http.authorizeHttpRequests( authorizeRequests ->  
                                    authorizeRequests
                                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                                        .requestMatchers("/").permitAll()
                                        .requestMatchers("/login").permitAll()
                                        .requestMatchers("/users/**").permitAll()
                                        .requestMatchers("/admin/**").hasRole("ADMIN")
                                        .anyRequest().authenticated();
                                    );
        // 인증 방식 설정
        http.userDetailService(customUserDetailService);

        return http.build();
    }

    // PasswordEncoder 빈 등록
    // 암호화 알고리즘 방식 : BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager 빈 등록
    private AuthenticationManager authenticationManager;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        this.authenticationManager = authenticationConfiguration.getAuthenticationManager();
        return authenticationManager;
    }

}