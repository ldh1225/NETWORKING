package com.example.networking.login.security.jwt.provider;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.example.networking.login.dto.CustomUser;
import com.example.networking.login.dto.UserAuth;
import com.example.networking.login.dto.Users;
import com.example.networking.login.mapper.UserMapper;
import com.example.networking.login.prop.JwtProps;
import com.example.networking.login.security.jwt.constants.JwtConstants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

/**
 *  🔐 JWT 토큰 관련 기능을 제공해주는 클래스
 *  ✅ 토큰 생성
 *  ✅ 토큰 해석
 *  ✅ 토큰 유효성 검사
 */
@Slf4j
@Component
public class JwtTokenProvider {

    @Autowired
    private JwtProps jwtProps;

    @Autowired
    private UserMapper userMapper;

    /*
     * 👩‍💼➡🔐 토큰 생성
     */
    public String createToken(int userNo, String userId, List<String> roles) {

        // 서명에 사용할 키 생성
        SecretKey key = Keys.hmacShaKeyFor(getSigningKey());

        // JWT 토큰 생성
        String jwt = Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS512) // 서명에 사용할 키와 알고리즘 설정
                .setHeaderParam("typ", JwtConstants.TOKEN_TYPE) // 헤더 설정 (JWT)
                .setExpiration(new Date(System.currentTimeMillis() + 864000000)) // 토큰 만료 시간 설정 (10일)
                .claim("uno", "" + userNo) // 클레임 설정: 사용자 번호
                .claim("uid", userId) // 클레임 설정: 사용자 아이디
                .claim("rol", roles) // 클레임 설정: 권한
                .compact();

        log.info("jwt : " + jwt);

        return jwt;
    }

    /**
     * 🔐➡👩‍💼 토큰 해석
     * 
     * Authorization : Bearer + {jwt}  (authHeader)
     * ➡ jwt 추출 
     * ➡ UsernamePasswordAuthenticationToken
     * @param authHeader
     * @return
     * @throws Exception
     */
    public UsernamePasswordAuthenticationToken getAuthentication(String authHeader) {
        if (authHeader == null || authHeader.length() == 0) 
            return null;

        try {
            // jwt 추출 (Bearer + {jwt}) ➡ {jwt}
            String jwt = authHeader.replace(JwtConstants.TOKEN_PREFIX, "");

            // 🔐➡👩‍💼 JWT 파싱
            Jws<Claims> parsedToken = Jwts.parserBuilder()
                                            .setSigningKey(getSigningKey())
                                            .build()
                                            .parseClaimsJws(jwt);

            log.info("parsedToken : " + parsedToken);

            // 인증된 사용자 번호
            String userNo = parsedToken.getBody().get("uno").toString();
            int no = (userNo == null ? 0 : Integer.parseInt(userNo));
            log.info("userNo : " + userNo);

            // 인증된 사용자 아이디
            String userId = parsedToken.getBody().get("uid").toString();
            log.info("userId : " + userId);

            // 인증된 사용자 권한
            Object roles = parsedToken.getBody().get("rol");
            log.info("roles : " + roles);

            // 토큰에 userId 있는지 확인
            if (userId == null || userId.length() == 0)
                return null;

            // 유저 정보 세팅
            Users user = new Users();
            user.setNo(no);
            user.setUserId(userId);
            // 권한도 Users 객체에 담기
            List<UserAuth> authList = ((List<?>) roles)
                                            .stream()
                                            .map(auth -> new UserAuth(userId, auth.toString()))
                                            .collect(Collectors.toList());
            user.setAuthList(authList);

            // CustomeUser에 권한 담기
            List<SimpleGrantedAuthority> authorities = ((List<?>) roles)
                                                        .stream()
                                                        .map(auth -> new SimpleGrantedAuthority((String) auth))
                                                        .collect(Collectors.toList());

            // 유효한 토큰인 경우 DB에서 추가 정보 조회
            try {
                Users userInfo = userMapper.select(no);
                if (userInfo != null) {
                    user.setName(userInfo.getName());
                    user.setEmail(userInfo.getEmail());
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                log.error("토큰 유효 -> DB 추가 정보 조회 시 에러 발생...");
            }

            UserDetails userDetails = new CustomUser(user);

            return new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

        } catch (ExpiredJwtException exception) {
            log.warn("Request to parse expired JWT : {} failed : {}", authHeader, exception.getMessage());
        } catch (UnsupportedJwtException exception) {
            log.warn("Request to parse unsupported JWT : {} failed : {}", authHeader, exception.getMessage());
        } catch (MalformedJwtException exception) {
            log.warn("Request to parse invalid JWT : {} failed : {}", authHeader, exception.getMessage());
        } catch (IllegalArgumentException exception) {
            log.warn("Request to parse empty or null JWT : {} failed : {}", authHeader, exception.getMessage());
        }

        return null;
    }

    /**
     * 💍❓ 토큰 유효성 검사
     * - 만료기간이 넘었는지?
     * @param jwt
     * @return
     *  ⭕ true     : 유효
     *  ❌ false    : 만료
     */
    public boolean validateToken(String jwt) {
        try {
            // 🔐➡👩‍💼 JWT 파싱
            Jws<Claims> parsedToken = Jwts.parserBuilder()
                                            .setSigningKey(getSigningKey())
                                            .build()
                                            .parseClaimsJws(jwt);

            log.info("##### 토큰 만료기간 #####");
            log.info("-> " + parsedToken.getBody().getExpiration());

            Date exp = parsedToken.getBody().getExpiration();

            return !exp.before(new Date());
            
        } catch (ExpiredJwtException exception) {
            log.error("Token Expired"); // 토큰 만료 
            return false;
        } catch (JwtException exception) {
            log.error("Token Tampered"); // 토큰 손상
            return false;
        } catch (NullPointerException exception) {
            log.error("Token is null"); // 토큰 없음
            return false;
        }
    }

    // secretKey ➡ signingKey
    private byte[] getSigningKey() {
        return jwtProps.getSecretKey().getBytes();
    }
}
