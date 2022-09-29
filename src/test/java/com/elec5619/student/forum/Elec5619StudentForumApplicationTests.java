package com.elec5619.student.forum;

import com.elec5619.student.forum.daos.*;
import com.elec5619.student.forum.pojos.*;
import com.elec5619.student.forum.services.*;
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

	@Autowired
	DiscussionService discussionService;

	@Autowired
	CategoryService categoryService;

	@Autowired
	CommentService commentService;

	@Autowired
	NoticeService noticeService;

	@Autowired
	NoteCategoryService noteCategoryService;

	@Autowired
	NoteService noteService;

	@Autowired
	NoteCommentService noteCommentService;
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
		user.setPhoneNumber("3423523543");
		user.setNickName("zzh");
		userService.insert(user);
	}

	@Test
	void addLikeToDiscussion(){
		Discussion discussion = discussionService.findById(12);
		System.out.println(discussion);
		System.out.println("\n\n\n\n\n\n");
		discussionService.beenLiked(discussion);
	}

	@Test
	void CategoryTesting(){
		System.out.println(categoryService.findAllCategory());
		Category category = new Category();
		category.setContent("it's a test category");
		categoryService.insertOrUpdateCategory(category);
		System.out.println(categoryService.findAllCategory().get(0).getContent());
		System.out.println(categoryService.getByID(3).getContent());
	}

	@Test
	void UserTesting(){
		User user = new User();
		user.setPassword("zzh200057");
		user.setPhoneNumber("12345678");
		user.setNickName("zzh3");
		user.setEmail("819932926");
		user.setSignature("zxc");
		userService.insert(user);
		System.out.println(userService.getUserByID(2));

	}

    @Test
	void DiscussionTest(){

		 Discussion discussion = new Discussion();
		 discussion.setTitle("testDiscussion2");
		 discussion.setContent("test2");
		 discussion.setUser(userService.getUserByID(2));
		 discussion.setCategory(categoryService.getByID(3));
		 discussionService.addNew(discussion);
		 /*Discussion discussion = discussionService.findById(5);
		 discussionService.beenLiked(discussion);
		 discussionService.beenViewed(discussion);
		 System.out.println(discussionService.findByCategory(3));
		 System.out.println(discussionService.findByUser(2));*/
	}

	@Test
	void CommentTesting(){
		/*Comment comment = new Comment();
		comment.setContent("testContentChild");
		comment.setSender(userService.getUserByID(2));
		comment.setDiscussion(discussionService.findById(5));
		comment.setParent(commentService.findByID(6));
		comment.setIsCommentOfComment(1);
		commentService.insertOrUpdate(comment);*/
		/*System.out.println(commentService.findCommentByDiscussion(5));
		System.out.println(commentService.findCommentByUserId(2));*/
		/*commentService.addLike(commentService.findByID(6));*/
		/*System.out.println(commentService.findChildComments(6));*/
		System.out.println(commentService.findCommentByDiscussionMain(5));

	}

	@Test
	void NoticeTest(){
		Notice notice = new Notice();
		notice.setContent("test Content");
		notice.setSender(userService.getUserByID(2));
		notice.setReceiver(userService.getUserByID(8));
		noticeService.insertOrUpdate(notice);
		System.out.println(noticeService.findByReceiver(8));
		System.out.println(noticeService.findBySender(2));
	}

	@Test
	void categoryNoteTest(){
		Category_Note category_note = new Category_Note();
		category_note.setContent("testNoteCategory");
		noteCategoryService.insertCategory(category_note);
		System.out.println(noteCategoryService.GetCategoryByID(12));
	}

	@Test
	void NoteTest2(){
		Note note = new Note();
		note.setCategory(noteCategoryService.GetCategoryByID(12));
		note.setDescription("a test note2");
		note.setPath("/Notes");
		note.setOwner(userService.getUserByID(2));
		note.setPrice(50);
		noteService.insertOrUpdate(note);
		//noteService.beenBuy(noteService.findById(15),8);
		noteService.beenWished(noteService.findById(15),8);
		System.out.println(noteService.getNoteByBought(8));
		System.out.println(noteService.getNoteByOwned(2));
		System.out.println(noteService.getNoteByWished(8));
		System.out.println(noteService.getNoteByCategory(12));


	}

	@Test
	void NoteCommentTest(){
		/*Comment_Note comment_note = new Comment_Note();
		comment_note.setContent("test Content");
		comment_note.setUser(userService.getUserByID(8));
		comment_note.setNote(noteService.findById(15));
		comment_note.setIsCommentOfComment(1);
		comment_note.setParent(noteCommentService.findByid(27));
		noteCommentService.insertOrUpdate(comment_note);*/
		System.out.println(noteCommentService.findCommentByNote(15));
		System.out.println(noteCommentService.findCommentByNoteMain(15));
		noteCommentService.addLikeNumber(27);
		System.out.println(noteCommentService.findCommentByUser(8));
		System.out.println(noteCommentService.findCommentByParent(27));
	}

		/*Comment comment = new Comment();
		comment.setContent("testContentChild");
		comment.setSender(userService.getUserByID(2));
		comment.setDiscussion(discussionService.findById(5));
		comment.setParent(commentService.findByID(6));
		comment.setIsCommentOfComment(1);
		commentService.insertOrUpdate(comment);*/
		/*System.out.println(commentService.findCommentByDiscussion(5));
		System.out.println(commentService.findCommentByUserId(2));*/
	/*commentService.addLike(commentService.findByID(6));*/
	/*System.out.println(commentService.findChildComments(6));*/
		//System.out.println(commentService.findCommentByDiscussionMain(5));
}
