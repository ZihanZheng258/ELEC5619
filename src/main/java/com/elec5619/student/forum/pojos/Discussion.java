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
public class Discussion {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String Content;

    @Column(name = "comments_number")
    private int commentNumber;

    @Column(name = "view_number")
    private int viewNumber;

    @Column(name = "like_number")
    private int likeNumber;

    @Column(name = "create_date")
    @CreatedDate
    private Date createDate;

    @OneToMany(mappedBy = "discussion",fetch = FetchType.LAZY)
    private List<Comment> Comments = new ArrayList<>();

    @ManyToOne(targetEntity = Category.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User user;

}
