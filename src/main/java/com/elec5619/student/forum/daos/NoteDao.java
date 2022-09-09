package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteDao extends JpaRepository<Note,Integer> {

}
