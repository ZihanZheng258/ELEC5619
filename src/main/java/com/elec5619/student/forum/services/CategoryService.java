package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.CategoryDao;
import com.elec5619.student.forum.pojos.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Category getByID(int id){
        return categoryDao.findById(id).get();
    }

    public Category getByContent(String content){
        return categoryDao.findByContent(content);
    }




}
