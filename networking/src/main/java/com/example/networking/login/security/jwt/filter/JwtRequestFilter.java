package com.example.networking.login.security.jwt.filter;

import java.io.IOException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import com.example.networking.login.security.jwt.constants.JwtConstants;
import com.example.networking.login.security.jwt.provider.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtRequestFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String header = request.getHeader(JwtConstants.TOKEN_HEADER);
        log.info("authorization : " + header);

        if (header == null || !header.startsWith(JwtConstants.TOKEN_PREFIX)) {
            log.info("헤더가 없거나 유효하지 않습니다.");
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = header.replace(JwtConstants.TOKEN_PREFIX, "");
        log.info("JWT 토큰 : " + jwt);

        if (jwtTokenProvider.validateToken(jwt)) {
            Authentication authentication = jwtTokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("유효한 JWT 토큰입니다.");
        } else {
            log.info("유효하지 않은 JWT 토큰입니다.");
        }

        filterChain.doFilter(request, response);
    }
}
