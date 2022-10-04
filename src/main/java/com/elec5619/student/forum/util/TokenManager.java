package com.elec5619.student.forum.util;

import io.jsonwebtoken.CompressionCodecs;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.security.SignatureException;
import java.util.Date;

@Component
public class TokenManager {
    private long tokenExpiration = 24*60*60*1000;
    private String tokenSignKey = "9a02115a835ee03d5fb83cd8a468ea33e4090aaaec" +
            "87f53c9fa54512bbef4db8dc656c82a315fa0c78" +
            "ewrwerfwer5c08b0134716b81ddcd0153d2a7556f2e154912cf5675f";


    public String createToken(String username) {
        String token = Jwts.builder().setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() +
                        tokenExpiration))
                .signWith(SignatureAlgorithm.HS512,
                        tokenSignKey).compressWith(CompressionCodecs.GZIP).compact();
        return token;
    }

    public String getUserFromToken(String token) {
        String user = Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(token).getBody().getSubject();
        return user;
    }

    public void removeToken(String token) {
    }

    public boolean CheckToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(authToken);
            return true;
        } catch (Exception exception){
            System.out.println("\n\n\n\n\n" + exception.getMessage());
            return false;
        }

    }

}
