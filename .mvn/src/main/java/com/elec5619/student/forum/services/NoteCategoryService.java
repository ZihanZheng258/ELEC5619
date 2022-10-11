package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.CategoryDao;
import com.elec5619.student.forum.daos.NoteCategoryDao;
import com.elec5619.student.forum.pojos.Category;
import com.elec5619.student.forum.pojos.Category_Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteCategoryService {
    @Autowired
    NoteCategoryDao noteCategoryDao;

    public List<Category_Note> findAllCategory(){
        return  noteCategoryDao.findAll();
    }

    public boolean DeleteCategory(String content){
        try{
            noteCategoryDao.deleteByContent(content);
        }
        catch (Exception e){
            return false;
        }
        return true;
    }

    public boolean DeleteCategory(Integer id){
        try{
            noteCategoryDao.deleteById(id);
        }
        catch (Exception e){
            return false;
        }
        return true;
    }

    public boolean insertCategory(Category_Note category){

        try{
            noteCategoryDao.save(category);
        }
        catch (Exception e){
            return false;
        }
        return true;
    }

    public Category_Note getCategoryByID(int id){
       return noteCategoryDao.findById(id).get();
    }


}
