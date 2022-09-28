package com.elec5619.student.forum.pojos;

import lombok.Data;
import lombok.Getter;
import org.aspectj.weaver.ast.Not;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.*;

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
    @CreatedDate
    private Date createDate;

    @Column(name = "avatar")
    private String avatar;


    @Column(name = "phone_number")
    private String PhoneNumber;

    @Column(name = "type")
    private Integer type;

    @Column(name = "email")
    private String email;

    @Column(name = "status")
    private Integer status;

    @Column(name = "credit",columnDefinition = "INT(11) UNSIGNED")
    @ColumnDefault("100")
    private Integer credit;

    @ManyToMany(targetEntity = Note.class,cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name = "user_note",joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "noteID"))
    private List<Note> notes = new ArrayList<Note>();

    @ManyToMany(targetEntity = Note.class,cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name = "user_wished_note",joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "noteID"))
    private List<Note> wishedNotes = new ArrayList<Note>();

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    private List<Discussion> discussions = new ArrayList<Discussion>();

    @OneToMany(mappedBy = "receiver",fetch = FetchType.LAZY)
    private List<Notice> receivedNotices = new ArrayList<Notice>();

    @OneToMany(mappedBy = "sender",fetch = FetchType.LAZY)
    private List<Comment> sendedComments = new ArrayList<Comment>();

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    private List<Comment_Note> sendedNoteComments = new ArrayList<Comment_Note>();




}
