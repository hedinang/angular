package com.ghdc.affiliate.jwt;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    public String token;
    public String userName;
    public String displayName;
    public String code;
}
