package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Category;
import com.elec5619.student.forum.pojos.Category_Note;
import com.elec5619.student.forum.pojos.Comment_Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface NoteCategoryDao extends JpaRepository<Category_Note,Integer>, JpaSpecificationExecutor<Category_Note> {

    public Category_Note findByContent(String content);

    public void deleteByContent(String Content);

}
