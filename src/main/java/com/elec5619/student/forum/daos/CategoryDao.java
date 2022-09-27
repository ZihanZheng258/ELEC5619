package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Category;
import com.elec5619.student.forum.pojos.Category_Note;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;


public interface CategoryDao extends JpaRepository<Category,Integer>, JpaSpecificationExecutor<Category> {

    public Long deleteByContent(String Content);

    public Category_Note findByContent(String content);



}
