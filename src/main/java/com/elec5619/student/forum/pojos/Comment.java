package com.elec5619.student.forum.pojos;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table
public class Comment {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "content")
    private String content;

    @Column(name = "create_date")
    @CreatedDate
    private Date createDate;

    @Column(name = "like_number")
    private int likeNumber;

    @Column(name = "is_comment_of_comment")
    private int isCommentOfComment;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne(targetEntity = Discussion.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "discussion_id")
    private Discussion discussion;

    @OneToOne(targetEntity = Comment.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "target_comment_id")
    private Comment targetComment;


}
