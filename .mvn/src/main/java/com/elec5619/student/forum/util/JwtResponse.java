package com.elec5619.student.forum.util;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {

    private String accessToken;
    private String tokenType = "User";

    public JwtResponse(String accessToken){
        this.accessToken = accessToken;
    }
}
