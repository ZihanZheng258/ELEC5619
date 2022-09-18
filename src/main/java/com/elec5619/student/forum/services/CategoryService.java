package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.CategoryDao;
import com.elec5619.student.forum.pojos.Category;
import com.elec5619.student.forum.pojos.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryDao categoryDao;

    public List<Category> findAllCategory(){
        return  categoryDao.findAll();
    }

    public boolean DeleteCategory(String content){
        try{
            categoryDao.deleteByContent(content);
        }
        catch (Exception e){
            return false;
        }
        return true;
    }

    public boolean DeleteCategory(Integer id){
        try{
            categoryDao.deleteById(id);
        }
        catch (Exception e){
            return false;
        }
        return true;
    }

    public boolean insertOrUpdateCategory(Category category){

        try{
            categoryDao.save(category);
        }
        catch (Exception e){
            return false;
        }
        return true;
    }


}
