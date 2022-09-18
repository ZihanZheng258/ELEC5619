package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.NoticeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeService {
    @Autowired
    NoticeDao noticeDao;
}
