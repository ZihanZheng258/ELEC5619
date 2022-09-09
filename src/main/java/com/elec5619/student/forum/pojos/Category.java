package com.elec5619.student.forum.pojos;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue
    @Column( name = "id")
    private int id;

    @Column(name = "content")
    private String content;

    @OneToMany(mappedBy = "category",fetch = FetchType.LAZY)
    List<Discussion> discussionList;
}
