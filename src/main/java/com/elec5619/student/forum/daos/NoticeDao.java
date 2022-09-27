package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Notice;
import org.aspectj.weaver.ast.Not;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface NoticeDao extends JpaRepository<Notice,Integer>, JpaSpecificationExecutor<Notice> {
    @Transactional
    @Modifying
    @Query("update Notice n set n.haveRead = 1 where n.id = ?1")
    int updateHaveReadBy(int ID);

}
