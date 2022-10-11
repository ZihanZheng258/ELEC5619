package com.elec5619.student.forum.pojos;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "category_Note")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Category_Note {
    @Id
    @GeneratedValue
    @Column( name = "id")
    private int id;

    @Column(name = "content")
    private String content;

    @OneToMany(mappedBy = "category",fetch = FetchType.LAZY)
    @JsonIgnore
    List<Note> NoteList;

    @Transient
    private List<Note> JsonNoteList;


}
