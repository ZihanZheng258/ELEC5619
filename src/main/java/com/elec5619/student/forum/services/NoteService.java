package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.CategoryDao;
import com.elec5619.student.forum.daos.NoteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService {
    @Autowired
    NoteDao noteDao;
}
