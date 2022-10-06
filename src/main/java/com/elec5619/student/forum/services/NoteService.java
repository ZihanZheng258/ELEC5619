package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.CategoryDao;
import com.elec5619.student.forum.daos.NoteCategoryDao;
import com.elec5619.student.forum.daos.NoteDao;
import com.elec5619.student.forum.daos.UserDao;
import com.elec5619.student.forum.pojos.Category_Note;
import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.Note;
import com.elec5619.student.forum.pojos.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.util.List;

@Service
public class NoteService {
    @Autowired
    NoteDao noteDao;

    @Autowired
    UserDao userDao;

    @Autowired
    NoteCategoryDao noteCategoryDao;

    public Note findById(int ID){
        return noteDao.findById(ID).get();
    }

    public boolean insertOrUpdate(Note note){
        noteDao.save(note);
        return true;
    }

    public boolean beenBuy(Note note,int buyerID){
        noteDao.updateNumOfBuyBy(1,note.getId());
        userDao.addCredit(note.getPrice(),note.getOwner().getId());
        userDao.addCredit(-note.getPrice(),buyerID);
        User user = userDao.findById(buyerID).get();
        user.getBoughtNotes().add(note);
        userDao.save(user);
        return true;
    }

    public boolean beenWished(Note note, int wisherID){
        User user = userDao.findById(wisherID).get();
        user.getWishedNotes().add(note);
        userDao.save(user);
        return true;
    }

    public List<Note> getNoteByCategory(int ID){
        Category_Note category_note = noteCategoryDao.findById(ID).get();
        return  category_note.getNoteList();
    }

    public List<Note> getNoteByOwned(int ID){
        User owner = userDao.findById(ID).get();
        return owner.getNotes();
    }
    public List<Note> getNoteByBought(int ID){
        User owner = userDao.findById(ID).get();
        return owner.getBoughtNotes();
    }
    public List<Note> getNoteByWished(int ID){
        User owner = userDao.findById(ID).get();
        return owner.getWishedNotes();
    }

    public Page<Note> findByCategoryPaged(int id, Pageable pageable){
        Page<Note> page= noteDao.findByCategory_Id(id,pageable);
        return page;
    }

    public Page<Note> getAllNotePaged(Pageable pageable){
        Page<Note> page= noteDao.findAll(pageable);
        return page;
    }




}
