package com.elec5619.student.forum.services;

import com.elec5619.student.forum.daos.CategoryDao;
import com.elec5619.student.forum.daos.DiscussionDao;
import com.elec5619.student.forum.daos.UserDao;
import com.elec5619.student.forum.pojos.Category;
import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscussionService {

    @Autowired
    DiscussionDao discussionDao;

    @Autowired
    UserDao userDao;

    @Autowired
    CategoryDao categoryDao;


    public boolean addNew(Discussion discussion){

        discussionDao.save(discussion);
        return true;
    }

    public Page<Discussion> getAllDiscussionPaged(Pageable pageable){
        Page<Discussion> page= discussionDao.findAll(pageable);
        return page;
    }

    public boolean beenViewed(Discussion discussion){
        discussionDao.addView(1,discussion.getId());
        return true;
    }

    public Discussion findById(int ID){
        return discussionDao.findById(ID).get();
    }

    public boolean beenLiked(Discussion discussion){
        discussionDao.addLike(1,discussion.getId());
        userDao.addCredit(5,discussion.getUser().getId());
        return true;
    }

    public List<Discussion> findByUser(int id){
        User user = userDao.findById(id).get();
        return user.getDiscussions();
    }

    public List<Discussion> findByCategory(int id){
        Category category = categoryDao.findById(id).get();
        return category.getDiscussionList();
    }


    public Page<Discussion> findByCategoryPaged(int id,Pageable pageable){
        Page<Discussion> page= discussionDao.findByCategoryPaged(id,pageable);
        return page;
    }

    public Page<Discussion> findByCategoryPaged(String content,Pageable pageable){
        Page<Discussion> page= discussionDao.findByCategoryPaged(content,pageable);
        return page;
    }

    public List<Discussion> findByUser(String nickName){
        User user = userDao.findByNickName(nickName);
        return user.getDiscussions();
    }

    public Page<Discussion> findByContain(String content,Pageable pageable){
        Page<Discussion> page = discussionDao.findByContentContaining(content,pageable);
        return page;
    }

    public void loadUserDataForPage(Page<Discussion> discussions){
        List<Discussion> discussionList = discussions.getContent();
        for (Discussion discussion: discussionList) {
            discussion.setJsonUser(discussion.getUser());
        }
    }

    public void loadCategoryDataForPage(Page<Discussion> discussions){
        List<Discussion> discussionList = discussions.getContent();
        for (Discussion discussion: discussionList) {
            discussion.setJsonCategory(discussion.getCategory());
        }
    }

    public void loadUserDataForList(List<Discussion> discussions){
        for (Discussion discussion: discussions) {
            discussion.setJsonUser(discussion.getUser());
        }
    }

    public void loadCategoryDataForPage(List<Discussion> discussions){
        for (Discussion discussion: discussions) {
            discussion.setJsonCategory(discussion.getCategory());
        }
    }
}
