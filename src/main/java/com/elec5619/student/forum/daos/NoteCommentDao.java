package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Comment_Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NoteCommentDao extends JpaRepository<Comment_Note,Integer>, JpaSpecificationExecutor<Comment_Note> {
    public List<Comment_Note> findByNote(int noteID);

    public List<Comment_Note> findByUser(int senderID);


    @Transactional
    @Modifying
    @Query("update Comment_Note c set c.likeNumber =c.likeNumber + ?1 where c.id = ?2")
    int updateLikeNumberBy(int likeNumber, int ID);


    @Override
    void deleteById(Integer integer);
}
