package com.elec5619.student.forum.pojos;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue
    private int id;
    @Column(name = "content")
    private String content;
}
