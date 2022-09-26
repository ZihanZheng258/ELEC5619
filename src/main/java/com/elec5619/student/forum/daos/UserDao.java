package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserDao extends JpaRepository<User,Integer>, JpaSpecificationExecutor<User> {

    public User findByNickName(String nickname);

    @Transactional
    @Modifying
    @Query("update User u set u.credit = u.credit + ?1")
    int addCredit(Integer credit);


}
