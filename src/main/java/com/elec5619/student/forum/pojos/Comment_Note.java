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
public class Comment_Note {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "create_date")
    @CreatedDate
    private Date create_date;

    @Column(name = "content")
    private String content;

    @Column(name = "like_number")
    private int like_number;


    @Column(name = "is_comment_of_comment")
    private int is_comment_of_comment;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User user;

    @ManyToOne(targetEntity = Note.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id")
    private Note note;

    @OneToOne(targetEntity = Comment_Note.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "target_comment_id")
    private Comment_Note targetComment;


}
