package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Category;
import com.elec5619.student.forum.pojos.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CommentDao extends JpaRepository<Comment,Integer>, JpaSpecificationExecutor<Comment> {
    List<Comment> findByDiscussion_IdAndIsCommentOfComment(int id, int isCommentOfComment);

    List<Comment> findByParent_Id(int id);


    List<Comment> findByTarget_Id(int id);




    public List<Comment> findBySender(int senderID);

    @Transactional
    @Modifying
    @Query("update Comment c set c.likeNumber = c.likeNumber + ?1 where c.id = ?2")
    int addLike(int likeNumber,int ID);






}
