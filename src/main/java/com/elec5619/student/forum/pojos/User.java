package com.elec5619.student.forum.pojos;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "nickName")
    private String nickName;

    @Column(name = "signature")
    private String signature;

    @Column(name = "password")
    private String password;

    @Column(name = "salt")
    private String salt;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "avatar")
    private int avatar;

    @Column(name = "phone_number")
    private String Phone_number;

    @Column(name = "type")
    private int type;

    @Column(name = "email")
    private String email;

    @Column(name = "status")
    private int status;

    @Column(name = "credit")
    private int credit;


}
