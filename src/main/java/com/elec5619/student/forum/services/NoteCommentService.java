package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.CategoryDao;
import com.elec5619.student.forum.daos.NoteCommentDao;
import com.elec5619.student.forum.daos.NoteDao;
import com.elec5619.student.forum.daos.UserDao;
import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Comment_Note;
import com.elec5619.student.forum.pojos.Note;
import com.elec5619.student.forum.pojos.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteCommentService {
    @Autowired
    NoteCommentDao noteCommentDao;

    @Autowired
    UserDao userDao;

    @Autowired
    NoteDao noteDao;

    public boolean insertOrUpdate(Comment_Note noteComment){
        noteCommentDao.save(noteComment);
        return true;
    }

    public Comment_Note findByid(int id){
       return noteCommentDao.findById(id).get();
    }

    public boolean delete(Comment_Note noteComment){

        noteCommentDao.delete(noteComment);
        return true;
    }

    public boolean deleteNoteComment(int ID){

        noteCommentDao.deleteById(ID);
        return true;
    }

    public boolean addLikeNumber(int ID){
        noteCommentDao.updateLikeNumberBy(1,ID);

        return true;
    }

    public List<Comment_Note> findCommentByNote(int ID){
        Note note = noteDao.findById(ID).get();
        return note.getComments();

    }

    public List<Comment_Note> findCommentByUser(int ID){
        User user = userDao.findById(ID).get();
        return user.getSendedNoteComments();
    }

    public List<Comment_Note> findCommentByNoteMain(int ID){
        List<Comment_Note> list = noteCommentDao.findByNote_IdAndIsCommentOfComment(ID,0);
        return list;
    }

    public List<Comment_Note> findCommentByParent(int ID){
        return findByid(ID).getChildren();
    }

    public void loadSenderForList(List<Comment_Note> comments){
        for (Comment_Note comment: comments) {
            comment.setJsonSender(comment.getUser());
        }
    }

    public void LoadSenderForPage(Page<Comment_Note> Pages){
        List<Comment_Note> comments = Pages.getContent();
        loadSenderForList(comments);
    }

    public void loadLikerForList(List<Comment_Note> comments){
        for (Comment_Note comment: comments) {
            comment.setJsonLiker(comment.getLiker());
        }
    }

    public void loadLikerForPage(Page<Comment_Note> Pages){
        List<Comment_Note> comments = Pages.getContent();
        loadLikerForList(comments);
    }

}
