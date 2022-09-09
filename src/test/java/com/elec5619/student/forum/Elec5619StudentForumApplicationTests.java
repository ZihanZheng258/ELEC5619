package com.elec5619.student.forum;

import com.elec5619.student.forum.daos.CategoryDao;
import com.elec5619.student.forum.daos.DiscussionDao;
import com.elec5619.student.forum.daos.UserDao;
import com.elec5619.student.forum.pojos.Category;
import com.elec5619.student.forum.pojos.Discussion;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Rollback(false)
class Elec5619StudentForumApplicationTests {

	@Autowired
	CategoryDao categoryDao;

	@Autowired
	DiscussionDao discussionDao;

	@Autowired
	UserDao userDao;


	@Test
	void contextLoads() {
		Category category = new Category();
		category.setContent("test");
		categoryDao.save(category);
	}
    @Test
	void addDiscussion(){
		Discussion discussion = new Discussion();
		discussion.setTitle("testTitile");
		discussionDao.save(discussion);
	}

	@Test
	void getCategoryWithDiscussion() throws InterruptedException {
        try {
			categoryDao.deleteById(new Integer(3));
		}catch (Exception e){

		}


		Thread.sleep(10000);

		categoryDao.deleteById(new Integer(3));
	}
}
