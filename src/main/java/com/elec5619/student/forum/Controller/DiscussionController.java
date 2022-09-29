package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.services.CommentService;
import com.elec5619.student.forum.services.DiscussionService;
import com.elec5619.student.forum.services.UserService;
import com.elec5619.student.forum.util.JsonReturnType;
import org.springframework.beans.factory.annotation.Autowired;
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
    CommentService commentService;

    @GetMapping("/like/{id}")
    @ResponseBody
    public JsonReturnType likeDiscussion(@PathVariable int id){
        Discussion discussion = discussionService.findById(id);
        discussion.setJsonCategory(discussion.getCategory());
        discussion.setJsonUser(discussion.getUser());
        discussion.setJsonComments(discussion.getComments());
        discussionService.beenLiked(discussion);
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("discussion",discussion);
        return jsonReturnType;
    }

    @PostMapping("/")
    @ResponseBody
    public JsonReturnType AddDiscussion(@RequestBody Discussion discussion, Principal principal){
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        jsonReturnType.getData().put("name",principal.getName());
        return jsonReturnType;
    }

    @GetMapping("/{id}/{page}")
    @ResponseBody
    public JsonReturnType getAllDiscussion(@PathVariable int id,@PathVariable int page){
        JsonReturnType jsonReturnType = new JsonReturnType();
        Pageable pageable = PageRequest.of(page,15);
        jsonReturnType.getData().put("discussions",discussionService.findByCategoryPaged(id,pageable));
        return jsonReturnType;
    }
    @GetMapping("/{id}")
    @ResponseBody
    public JsonReturnType getDiscussion(@PathVariable int id){
        JsonReturnType jsonReturnType = new JsonReturnType();
        List<Comment> comments = commentService.findCommentByDiscussionMain(id);
        return jsonReturnType;
    }

}
