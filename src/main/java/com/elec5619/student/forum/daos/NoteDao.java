package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NoteDao extends JpaRepository<Note,Integer>, JpaSpecificationExecutor<Note> {

    public List<Discussion> findAllByOrderByCreateDate();

    @Transactional
    @Modifying
    @Query("update Note n set n.numOfBuy = n.numOfBuy + ?1 where n.id = ?2")
    int updateNumOfBuyBy(Integer numOfBuy,int ID);





}
