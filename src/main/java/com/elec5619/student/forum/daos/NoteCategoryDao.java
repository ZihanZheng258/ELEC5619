package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface NoteCategoryDao extends JpaRepository<Category,Integer>, JpaSpecificationExecutor<Category> {


}
