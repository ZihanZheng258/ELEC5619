package com.elec5619.student.forum.pojos;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.aspectj.weaver.ast.Not;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "User")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class User {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "nickName")
    private String nickName;

    @Column(name = "signature")
    private String signature = "";

    @Column(name = "password")
    private String password;

    @Column(name = "salt")
    private String salt;

    @Column(name = "create_date")
    @CreatedDate
    private Date createDate = new Date();

    @Column(name = "avatar")
    private String avatar;


    @Column(name = "phone_number")
    private String PhoneNumber;

    @Column(name = "type")
    @ColumnDefault("0")
    private Integer type = 0;

    @Column(name = "email")
    private String email;

    @Column(name = "status")
    @ColumnDefault("1")
    private Integer status = 1;

    @Column(name = "credit",columnDefinition = "INT(11) UNSIGNED")
    @ColumnDefault("100")
    private Integer credit = 100;

    @OneToMany(mappedBy = "owner",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Note> notes = new ArrayList<Note>();

    @ManyToMany(targetEntity = Note.class,cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name = "user_wished_note",joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "noteID"))
    @JsonIgnore
    private List<Note> wishedNotes = new ArrayList<Note>();

    @ManyToMany(targetEntity = Note.class,cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name = "user_bought_note",joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "noteID"))
    @JsonIgnore
    private List<Note> boughtNotes = new ArrayList<Note>();


    @ManyToMany(targetEntity = Discussion.class,cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name = "user_liked_discussion",joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "discussionID"))
    @JsonIgnore
    private List<Discussion> likedDiscussion = new ArrayList<Discussion>();


    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Discussion> discussions = new ArrayList<Discussion>();

    @OneToMany(mappedBy = "receiver",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Notice> receivedNotices = new ArrayList<Notice>();

    @OneToMany(mappedBy = "sender",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Notice> senderNotices = new ArrayList<Notice>();

    @OneToMany(mappedBy = "sender",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Comment> sendedComments = new ArrayList<Comment>();

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Comment_Note> sendedNoteComments = new ArrayList<Comment_Note>();

    @Transient
    private List<Note> JsonOwnedNotes;

    @Transient
    private List<Note> JsonBoughtNotes;

    @Transient
    private List<Note> JsonWishedNotes;

    @Transient
    private List<Discussion> JsonDiscussions;

    @Transient
    private List<Notice> JsonReceivedNotices;

    @Transient
    private List<Notice> JsonSenderNotices;

    @Transient
    private List<Comment> JsonSenderComments;

    @Transient
    private List<Comment_Note> JsonSendedNoteComments;


}
