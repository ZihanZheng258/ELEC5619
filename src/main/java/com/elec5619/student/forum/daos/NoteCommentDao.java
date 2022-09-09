package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Comment_Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteCommentDao extends JpaRepository<Comment_Note,Integer> {
    public List<Comment_Note> findByNote(int noteID);

    public List<Comment_Note> findByUser(int senderID);
}
