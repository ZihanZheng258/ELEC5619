package com.elec5619.student.forum;

import com.elec5619.student.forum.daos.CategoryDao;
import com.elec5619.student.forum.daos.DiscussionDao;
import com.elec5619.student.forum.daos.NoteCategoryDao;
import com.elec5619.student.forum.daos.UserDao;
import com.elec5619.student.forum.pojos.Category;
import com.elec5619.student.forum.pojos.Category_Note;
import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.User;
import com.elec5619.student.forum.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

	@Autowired
	NoteCategoryDao noteCategoryDao;

	@Autowired
	UserService userService;

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

	@Test
	void AddCategoryNote()throws InterruptedException{
		Category_Note[] category_note = new Category_Note[10];
		for(int i = 0; i< category_note.length; i++){
			category_note[i] = new Category_Note();
		}
		category_note[0].setContent("Art and social sciences");
		category_note[1].setContent("Engineering");
		category_note[2].setContent("Medicine and health");
		category_note[3].setContent("Science");
		category_note[4].setContent("Architecture. Design and planning");
		category_note[5].setContent("Business");
		category_note[6].setContent("Law");
		category_note[8].setContent("Music");
		for(int i = 0; i< 9; i++){
			noteCategoryDao.save(category_note[i]);
		}

	}

	@Test
	void CategoryNoteSearchTest(){
		System.out.println(noteCategoryDao.findAll());
		System.out.println(noteCategoryDao.findByContent("Engineering"));
	}

	@Test
	void addUserTest(){
		User user = new User();
		user.setPassword("hjkk445998");
		user.setEmail("test");
		user.setPhone_number("3423523543");
		user.setNickName("zzh");
		userService.insert(user);
	}
}
