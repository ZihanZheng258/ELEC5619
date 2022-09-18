package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface DiscussionDao extends JpaRepository<Discussion,Integer>, JpaSpecificationExecutor<Discussion> {

    public List<Discussion> findByCategory(int categoryID);

    public List<Discussion> findByUser(int userID);

    public List<Discussion> findByCreateDateAfterOrderByCommentNumberDescLimitedTo(Date date,int number);

    public List<Discussion> findOrderByCreateDate();

    public List<Discussion> findOrderByLikeNumber();

    public List<Discussion> findOrderByCommentNumber();





}
