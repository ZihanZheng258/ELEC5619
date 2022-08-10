package com.elec5619.student.forum.pojos;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table
public class Discussion {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String Content;

    @Column(name = "comments_number")
    private int comment_number;

    @Column(name = "view_number")
    private int view_number;

    @Column(name = "category_id")
    private int categoryID;

    @Column(name = "owner_id")
    private int OwnerID;

    @Column(name = "like_number")
    private int likeNumber;

    @Column(name = "create_date")
    private Date create_date;

    @Transient
    private List<Comment> commentList;

}
