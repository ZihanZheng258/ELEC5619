package com.elec5619.student.forum.pojos;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "notes")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
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
    public Integer numOfBuy = 0;

    @Column(name = "description")
    public String description;

    @Column(name = "name")
    public String name;

    @Lob
    @Column(name = "content")
    @JsonIgnore
    public String content;

    @Column(name = "create_date")
    @CreatedDate
    private Date createDate = new Date();

    @ManyToMany(mappedBy="wishedNotes",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<User> wishers = new ArrayList<User>();

    @ManyToMany(mappedBy="boughtNotes",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<User> buyers = new ArrayList<User>();

    @ManyToOne(targetEntity = Category_Note.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "category_ID")
    @JsonIgnore
    private Category_Note category;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private User owner;

    @OneToMany(mappedBy = "note",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Comment_Note> Comments = new ArrayList<>();

    @Transient
    private List<User> JsonWishers = new ArrayList<User>();

    @Transient
    private List<User> JsonBuyers = new ArrayList<User>();

    @Transient
    private Category_Note JsonCategory;

    @Transient
    private User JsonOwner;

    @Transient
    private List<Comment_Note> JsonComments = new ArrayList<>();

    @Transient
    private int categoryId =-1;

    @Transient
    private String categoryName;



}
