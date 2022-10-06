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
public class Discussion {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "comments_number")
    private int commentNumber = 0;

    @Column(name = "view_number")
    private int viewNumber = 0;

    @Column(name = "like_number")
    private int likeNumber = 0;

    @Column(name = "create_date")
    @CreatedDate
    private Date createDate = new Date();

    @OneToMany(mappedBy = "discussion",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Comment> Comments = new ArrayList<>();

    @ManyToOne(targetEntity = Category.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private User user;

    @Transient
    private User JsonUser;
    @Transient
    private Category JsonCategory;
    @Transient
    private int categoryID;
    @Transient
    private int userID;
    @Transient
    private List<Comment> JsonComments;

}
