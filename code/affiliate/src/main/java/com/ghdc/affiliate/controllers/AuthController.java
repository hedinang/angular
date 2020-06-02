package com.ghdc.affiliate.controllers;


import com.ghdc.affiliate.jwt.JwtRequest;
import com.ghdc.affiliate.jwt.JwtResponse;
import com.ghdc.affiliate.jwt.JwtTokenProvider;
import com.ghdc.affiliate.jwt.JwtUserDetails;
import com.ghdc.affiliate.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public JwtResponse login(@RequestBody JwtRequest data) {
        try {
            String username = data.userName;
            String password = data.password;
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            return jwtTokenProvider.createToken(username);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Login Failed!");
        }
    }

    @PostMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal JwtUserDetails userDetails) {
        Map<String, Object> response = new HashMap<>();
        User account = userDetails.getUser();
        response.put("id", account.getId());
        response.put("code", account.getCode());
        response.put("userName", account.getUserName());
        response.put("displayName", account.getDisplayName());
        response.put("email", account.getEmail());
        response.put("phoneNumber", account.getPhoneNumber());
        return ok(response);
    }

}
