package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.CommentDao;
import com.elec5619.student.forum.daos.UserDao;
import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Synchronization;

@Service
public class CommentService {

    @Autowired
    CommentDao commentDao;

    @Autowired
    UserDao userDao;

    public boolean insertOrUpdate(Comment comment){

        try{
            commentDao.save(comment);
        }
        catch (Exception e){
            return false;
        }
        return true;
    }

    public boolean delete(Comment comment){
        try{
            commentDao.delete(comment);
        }
        catch (Exception e){
            return false;
        }
        return true;
    }

    public boolean delete(int id){
        try{
            commentDao.deleteById(id);
        }
        catch (Exception e){
            return false;
        }
        return true;
    }

    public boolean addLike(Comment comment){
        User user = comment.getSender();
        comment.setLikeNumber(comment.getLikeNumber()+1);
        user.setCredit(user.getCredit()+5);
        try{
            comment.setLikeNumber(comment.getLikeNumber()+1);
            user.setCredit(user.getCredit()+5);
            commentDao.save(comment);
            userDao.save(user);



        }
        catch (Exception e){
            return false;
        }
        return true;
    }




}
