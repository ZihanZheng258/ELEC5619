package com.elec5619.student.forum.pojos;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table
public class Comment {
    @Id
    @GeneratedValue
    private int id;
    @Column(name = "content")
    private String content;
    @Column(name = "sender_id")
    private int SenderID;
    @Column(name = "discussion_id")
    private int discussionID;
    @Column(name = "create_date")
    private Date create_date;
    @Column(name = "like_number")
    private int like_number;
    @Transient
    private Comment target_comment_id;
    @Column(name = "is_comment_of_comment")
    private int is_comment_of_comment;

}
