package com.example.networking.jwt.prop;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@Component
@ConfigurationProperties("com.example.networking") // com.example.networking 경로 하위 속성들을 지정
public class JwtProps {

    // 시크릿키 : JWT 시그니처 암호화를 위한 정보
    // com.example.networking.secret-key -> secretKey : {인코딩된 시크릿 키}
    private String secretkey;
}