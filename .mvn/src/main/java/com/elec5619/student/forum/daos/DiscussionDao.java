package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface DiscussionDao extends JpaRepository<Discussion,Integer>, JpaSpecificationExecutor<Discussion> {

    public List<Discussion> findByCategory(int categoryID);

    public List<Discussion> findByUser(int userID);

    public List<Discussion> findTop4ByCreateDateAfterOrderByCommentNumberDesc(Date date);

    public List<Discussion> findAllByOrderByCreateDateDesc();

    public List<Discussion> findAllByOrderByLikeNumberDesc();

    public List<Discussion> findAllByOrderByCommentNumberDesc();

    @Transactional
    @Modifying
    @Query("update Discussion d set d.likeNumber = d.likeNumber + ?1 where d.id = ?2")
    int addLike(int likeNumber, int ID);

    @Transactional
    @Modifying
    @Query("update Discussion d set d.viewNumber = d.viewNumber + ?1 where d.id = ?2")
    int addView(int viewNumber,int ID);

    @Transactional
    @Modifying
    @Query("update Discussion d set d.commentNumber = d.commentNumber + ?1 where d.id = ?2")
    int addCommentNumber(int commentNumber,int ID);

    @Query("select d from Discussion d where d.category.id = ?1")
    Page<Discussion> findByCategoryPaged(int id, Pageable pageable);

    Page<Discussion> findAll(Pageable pageable);

    @Query("select d from Discussion d where d.category.content = ?1")
    Page<Discussion> findByCategoryPaged(String content, Pageable pageable);

    List<Discussion> findByUser_NickName(String nickName);

    Page<Discussion> findByContentContaining(String content, Pageable pageable);

    @Transactional
    @Modifying
    @Query("update Discussion d set d.liker = :liker where d.id = :id")
    int updateLikerById(@Param("liker") User liker, @Param("id") int id);













}
