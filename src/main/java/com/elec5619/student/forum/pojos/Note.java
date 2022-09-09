package com.elec5619.student.forum.pojos;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.*;

@Data
@Entity
@Table(name = "notes")
public class Note {
    @Id
    @GeneratedValue
    @Column(name = "id")
    public Integer id;

    @Column(name = "path")
    public String Path;

    @Column(name = "price")
    public Integer price;

    @Column(name = "num_of_buy")
    public Integer num_of_buy;

    @Column(name = "description")
    public String description;

    @Column(name = "create_date")
    @CreatedDate
    private Date createDate;

    @ManyToMany(mappedBy="notes",fetch = FetchType.LAZY)
    private Set<User> buyers = new HashSet<User>();

    @ManyToOne(targetEntity = Category_Note.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "category_ID")
    private Category_Note category;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "note",fetch = FetchType.LAZY)
    private List<Comment_Note> Comments = new ArrayList<>();



}
