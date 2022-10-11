package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.CommentDao;
import com.elec5619.student.forum.daos.DiscussionDao;
import com.elec5619.student.forum.daos.UserDao;
import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Synchronization;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    CommentDao commentDao;

    @Autowired
    UserDao userDao;

    @Autowired
    DiscussionDao discussionDao;


    public boolean insertOrUpdate(Comment comment){

        try{
            commentDao.save(comment);
            discussionDao.addCommentNumber(1,comment.getDiscussion().getId());
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
        commentDao.addLike(1,comment.getId());
        userDao.addCredit(5,user.getId());
        return true;
    }

    public List<Comment> findCommentByDiscussion(int discussionID){
        Discussion discussion = discussionDao.findById(discussionID).get();
        return discussion.getComments();
    }

    public  List<Comment> findCommentByDiscussionMain(int discussionID){
       return commentDao.findByDiscussion_IdAndIsCommentOfComment(discussionID,0);
    }

    public List<Comment> findCommentByUserId(int userId){
        User user = userDao.findById(userId).get();
        return user.getSendedComments();
    }

    public  List<Comment> findChildComments(int CommentID){
        return commentDao.findByParent_Id(CommentID);
    }



    public  Comment findByID(int ID){
        return  commentDao.findById(ID).get();
    }


    public void loadSenderForList(List<Comment> comments){
        for (Comment comment: comments) {
            comment.setJsonSender(comment.getSender());
        }
    }

    public void LoadSenderForPage(Page<Comment> Pages){
        List<Comment> comments = Pages.getContent();
        loadSenderForList(comments);
    }

    public void loadLikerForList(List<Comment> comments){
        for (Comment comment: comments) {
            comment.setJsonLiker(comment.getLiker());
        }
    }

    public void loadLikerForPage(Page<Comment> Pages){
        List<Comment> comments = Pages.getContent();
        loadLikerForList(comments);
    }









}
