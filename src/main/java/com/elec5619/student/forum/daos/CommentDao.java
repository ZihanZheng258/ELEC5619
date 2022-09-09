package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentDao extends JpaRepository<Comment,Integer> {

    public List<Comment> findByDiscussion(int discussionID);

    public List<Comment> findBySender(int senderID);
}
