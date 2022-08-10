package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;


public interface CategoryDao {


    public Category getCategoryByID(@Param("id") int id);


    public void addCategory(Category category);

    public void deleteCategoryById(int id);

    public void UpdateCategory(Category category);

    public List<Category> getAllCategory();
}
