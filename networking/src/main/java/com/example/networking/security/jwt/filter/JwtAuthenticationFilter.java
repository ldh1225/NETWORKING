package com.example.networking.security.jwt.filter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.networking.dto.CustomUser;
import com.example.networking.security.jwt.constants.JwtConstants;
import com.example.networking.security.jwt.provider.JwtTokenProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        setFilterProcessesUrl(JwtConstants.AUTH_LOGIN_URL);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        log.info("username : " + username);
        log.info("password : " + password);

        UsernamePasswordAuthenticationToken authenticationToken = 
                new UsernamePasswordAuthenticationToken(username, password);

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authentication) throws IOException, ServletException {
        log.info("인증 성공...");

        CustomUser user = (CustomUser) authentication.getPrincipal();
        int userNo = user.getUser().getNo();
        String userId = user.getUser().getUserId();

        List<String> roles = user.getUser().getAuthList().stream()
                .map(auth -> auth.getAuth())
                .collect(Collectors.toList());

        String jwt = jwtTokenProvider.createToken(userNo, userId, roles);

        response.addHeader(JwtConstants.TOKEN_HEADER, JwtConstants.TOKEN_PREFIX + jwt);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        log.info("인증 실패...");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
