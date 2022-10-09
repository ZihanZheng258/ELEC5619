package com.elec5619.student.forum.pojos;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Comment {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "content")
    private String content;

    @Column(name = "create_date")
    @CreatedDate
    private Date createDate = new Date();

    @Column(name = "like_number")
    private int likeNumber = 0;

    @Column(name = "is_comment_of_comment")
    private int isCommentOfComment = 0;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    @JsonIgnore
    private User sender;

    @ManyToOne(targetEntity = Discussion.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "discussion_id")
    @JsonIgnore
    private Discussion discussion;

    @ManyToOne(targetEntity = Comment.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "TargetComment_id")
    @JsonIgnore
    private Comment target;

    @ManyToOne(targetEntity = Comment.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentComment_id")
    @JsonIgnore
    private Comment parent;

    @ManyToMany(mappedBy="likedComment",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<User> liker = new ArrayList<User>();


    @OneToMany(mappedBy="parent")
    @JsonIgnore
    private List<Comment> children;

    @OneToMany(mappedBy="target")
    @JsonIgnore
    private List<Comment> beenTarget;

    @Transient
    private User JsonSender;

    @Transient
    private Discussion JsonDiscussion;

    @Transient
    private Comment JsonTarget;

    @Transient
    private Comment JsonParent;


    @Transient
    private List<Comment> JsonChildren;

    @Transient
    private List<Comment> JsonBeenTarget;

    @Transient
    private int targetID;

    @Transient
    private int parentID;

    @Transient int discussionID;

    @Transient
    private List<User> JsonLiker;




}
