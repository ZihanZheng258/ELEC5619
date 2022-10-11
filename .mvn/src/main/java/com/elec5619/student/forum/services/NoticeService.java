package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.NoticeDao;
import com.elec5619.student.forum.daos.UserDao;
import com.elec5619.student.forum.pojos.Note;
import com.elec5619.student.forum.pojos.Notice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {
    @Autowired
    NoticeDao noticeDao;

    @Autowired
    UserDao userDao;


    public Notice findById(int ID){
        return noticeDao.findById(ID).get();
    }

    public List<Notice>findBySender(int ID){
        return userDao.findById(ID).get().getSenderNotices();
    }

    public List<Notice>findByReceiver(int ID){
        return userDao.findById(ID).get().getReceivedNotices();
    }


    public void insertOrUpdate(Notice notice){
        noticeDao.save(notice);
    }

}
