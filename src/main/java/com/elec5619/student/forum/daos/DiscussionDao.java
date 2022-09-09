package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussionDao extends JpaRepository<Discussion,Integer> {

    public List<Discussion> findByCategory(int categoryID);

    public List<Discussion> findByUser(int userID);
}
