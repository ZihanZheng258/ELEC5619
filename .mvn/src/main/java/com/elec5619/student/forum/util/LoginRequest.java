package com.elec5619.student.forum.util;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    private String usernameOrEmail;

    private String password;

}
