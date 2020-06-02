package com.ghdc.affiliate.jwt;

import com.ghdc.affiliate.model.user.User;
import com.ghdc.affiliate.services.UserServices;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private String secretKey = "secret";
    private final static long validityInMilliseconds = 7 * 86400 * 1000L; // 1day
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    UserServices userServices;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public JwtResponse createToken(String username) {
        User account = ((JwtUserDetails) userDetailsService.loadUserByUsername(username)).user;
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("userName", account.getUserName());
        claims.put("code", account.getCode());
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);
        String token = Jwts.builder()//
                .setClaims(claims)//
                .setIssuedAt(now)//
                .setExpiration(validity)//
                .signWith(SignatureAlgorithm.HS512, secretKey)//
                .compact();

        JwtResponse response = new JwtResponse();
        response.token = token;
        response.code = account.getCode();
        response.userName = account.getUserName();
        response.displayName = account.getDisplayName();
        return response;
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public String resolveToken(HttpServletRequest req) {
        String token = req.getHeader("access-token");
        String bearerToken = token != null ? token : req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        } else {
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            if (claims.getBody().getExpiration().before(new Date())) {
                return false;
            }
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}