package com.elec5619.student.forum.daos;

import com.elec5619.student.forum.pojos.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeDao extends JpaRepository<Notice,Integer> {
}
