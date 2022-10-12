package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.User;
import com.elec5619.student.forum.services.CategoryService;
import com.elec5619.student.forum.services.CommentService;
import com.elec5619.student.forum.services.DiscussionService;
import com.elec5619.student.forum.services.UserService;
import com.elec5619.student.forum.util.JsonReturnType;
import com.elec5619.student.forum.util.TokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/discussion")
public class DiscussionController {

    @Autowired
    DiscussionService discussionService;

    @Autowired
    UserService userService;


    @Autowired
    CategoryService categoryService;

    @Autowired
    CommentService commentService;

    @GetMapping("/like/{id}")
    @ResponseBody
    public JsonReturnType likeDiscussion(@PathVariable int id,Principal user){
        Discussion discussion = discussionService.findById(id);
        User user1 = userService.getUserByNickName(user.getName());
        discussionService.beenLiked(discussion,user1.getId());
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("discussion",discussion);
        jsonReturnType.flag = true;
        return jsonReturnType;
    }

    @GetMapping("/cancelLike/{id}")
    @ResponseBody
    public JsonReturnType cancelLikeDiscussion(@PathVariable int id,Principal user){
        Discussion discussion = discussionService.findById(id);
        User user1 = userService.getUserByNickName(user.getName());
        discussionService.cancelLiked(discussion,user1.getId());
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("discussion",discussion);
        jsonReturnType.flag = true;
        return jsonReturnType;
    }
    @PostMapping("/")
    @ResponseBody
    public JsonReturnType AddDiscussion(@RequestBody Discussion discussion,Principal user){
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        discussion.setCategory(categoryService.getByID(discussion.getCategoryID()));
        User user1 = userService.getUserByNickName(user.getName());
        discussion.setUser(user1);
        discussionService.addNew(discussion);
        jsonReturnType.getData().put("discussion",discussion);
        return jsonReturnType;
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public JsonReturnType jsonReturnType(@PathVariable int id,Principal user){
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        User user1 = userService.getUserByNickName(user.getName());
        Discussion discussion = discussionService.findById(id);
        user1.getDiscussions().remove(discussion);
        discussion.setUser(null);
        discussion.getComments().clear();
        discussionService.addNew(discussion);
        userService.insert(user1);
        return jsonReturnType;
    }

    @GetMapping("/{id}/{page}")
    @ResponseBody
    public JsonReturnType getPageOfCategoryDiscussion(@PathVariable int id,@PathVariable int page){
        JsonReturnType jsonReturnType = new JsonReturnType();
        Pageable pageable = PageRequest.of(page,15);
        jsonReturnType.getData().put("discussions",discussionService.findByCategoryPaged(id,pageable));
        return jsonReturnType;
    }

    @GetMapping("/user/{id}")
    @ResponseBody
    public JsonReturnType getUserDiscussions(@PathVariable int id){
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("discussions",discussionService.findByUser(id));
        return jsonReturnType;
    }



    @GetMapping("/{id}")
    @ResponseBody
    public JsonReturnType getDiscussion(@PathVariable int id){
        JsonReturnType jsonReturnType = new JsonReturnType();
        Discussion discussion = discussionService.findById(id);
        discussion.setJsonCategory(discussion.getCategory());
        discussion.setJsonUser(discussion.getUser());
        discussion.setJsonComments(commentService.findCommentByDiscussionMain(id));
        discussion.setJsonLiker(discussion.getLiker());
        for (Comment comment: discussion.getJsonComments()) {
            comment.setJsonChildren(commentService.findChildComments(comment.getId()));
            comment.setJsonSender(comment.getSender());
            if (comment.getTarget() != null){
                comment.setTargetName(comment.getTarget().getSender().getNickName());
            }
        }
        discussionService.beenViewed(discussion);
        jsonReturnType.getData().put("discussion",discussion);
        return jsonReturnType;
    }

    @GetMapping("/page/{page}")
    @ResponseBody
    public JsonReturnType getAllDiscussion(@PathVariable int page){
        JsonReturnType jsonReturnType = new JsonReturnType();
        Pageable pageable = PageRequest.of(page,15);
        Page<Discussion> page1 = discussionService.getAllDiscussionPaged(pageable);
        discussionService.loadUserDataForPage(page1);
        discussionService.loadCategoryDataForPage(page1);
        discussionService.loadLikerForPage(page1);
        jsonReturnType.getData().put("discussion",page1);
        return jsonReturnType;
    }

    @GetMapping("/user/nickName/{nickName}")
    @ResponseBody
    public JsonReturnType getUserDiscussions(@PathVariable String nickName){
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("discussions",discussionService.findByUser(nickName));
        return jsonReturnType;
    }

    @GetMapping("/search/{content}/{page}")
    @ResponseBody
    public JsonReturnType getSearchDiscussions(@PathVariable String content,@PathVariable int page){
        JsonReturnType jsonReturnType = new JsonReturnType();
        Pageable pageable = PageRequest.of(page,15);
        Page<Discussion> discussions = discussionService.findByContain(content,pageable);
        List<Discussion> discussionList = discussions.getContent();
        for (Discussion discussion: discussionList) {
            discussion.setJsonUser(discussion.getUser());
            discussion.setJsonCategory(discussion.getCategory());
        }
        discussionService.loadLikerForPage(discussions);
        jsonReturnType.getData().put("discussions",discussions);
        return jsonReturnType;
    }

    @GetMapping("/category/{content}/{page}")
    @ResponseBody
    public JsonReturnType getDiscussionsByCategory(@PathVariable String content,@PathVariable int page){
        JsonReturnType jsonReturnType = new JsonReturnType();
        Pageable pageable = PageRequest.of(page,15);
        Page<Discussion> discussions = discussionService.findByCategoryPaged(content,pageable);
        discussionService.loadCategoryDataForPage(discussions);
        discussionService.loadUserDataForPage(discussions);
        discussionService.loadLikerForPage(discussions);
        jsonReturnType.getData().put("discussions",discussions);
        return jsonReturnType;
    }


}
