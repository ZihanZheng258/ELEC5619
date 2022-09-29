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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Comment_Note {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "create_date")
    @CreatedDate
    private Date createDate = new Date();

    @Column(name = "content")
    private String content;

    @Column(name = "like_number")
    private int likeNumber = 0;


    @Column(name = "is_comment_of_comment")
    private int isCommentOfComment = 0;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    @JsonIgnore
    private User user;

    @ManyToOne(targetEntity = Note.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id")
    @JsonIgnore
    private Note note;

    @ManyToOne(targetEntity = Comment_Note.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "TargetComment_id")
    @JsonIgnore
    private Comment_Note target;

    @ManyToOne(targetEntity = Comment_Note.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentComment_id")
    @JsonIgnore
    private Comment_Note parent;


    @OneToMany(mappedBy="parent")
    @JsonIgnore
    private List<Comment_Note> children;

    @OneToMany(mappedBy="target")
    @JsonIgnore
    private List<Comment_Note> beenTarget;


    @Transient
    private User JsonUser;

    @Transient
    private Note JsonNote;

    @Transient
    private Comment_Note JsonTarget;

    @Transient
    private Comment_Note JsonParent;


    @Transient
    private List<Comment_Note> JsonChildren;

    @Transient
    private List<Comment_Note> JsonBeenTarget;

}
