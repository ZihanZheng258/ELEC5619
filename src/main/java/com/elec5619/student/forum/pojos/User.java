package com.elec5619.student.forum.pojos;

import lombok.Data;
import lombok.Getter;
import org.aspectj.weaver.ast.Not;
import org.hibernate.annotations.ColumnDefault;

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
    private Date createDate;

    @Column(name = "avatar")
    private String avatar;


    @Column(name = "phone_number")
    private String Phone_number;

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
    private Set<Note> notes = new HashSet<Note>();

    @ManyToMany(targetEntity = Note.class,cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name = "user_wished_note",joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "noteID"))
    private Set<Note> wishedNotes = new HashSet<Note>();

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    private Set<Discussion> discussions = new HashSet<Discussion>();

    @OneToMany(mappedBy = "receiver",fetch = FetchType.LAZY)
    private Set<Notice> receivedNotices = new HashSet<Notice>();

    @OneToMany(mappedBy = "sender",fetch = FetchType.LAZY)
    private Set<Comment> sendedComments = new HashSet<>();

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    private Set<Comment_Note> sendedNoteComments = new HashSet<>();




}
