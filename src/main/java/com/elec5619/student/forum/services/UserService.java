package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.UserDao;
import com.elec5619.student.forum.pojos.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public boolean insert(User user){
        encryptPassword(user);
        try{
            userDao.save(user);
        }
        catch (Exception e){
            return false;
        }
        return true;
    }

    public void encryptPassword(User user){
        String password = user.getPassword();
        password = new BCryptPasswordEncoder().encode(password);
        user.setPassword(password);
    }

    public User getUserByID(int id){
        return userDao.findById(id).get();
    }

}
