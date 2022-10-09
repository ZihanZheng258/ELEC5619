package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.daos.CommentDao;
import com.elec5619.student.forum.daos.DiscussionDao;
import com.elec5619.student.forum.daos.UserDao;
import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.User;
import com.elec5619.student.forum.services.CommentService;
import com.elec5619.student.forum.services.DiscussionService;
import com.elec5619.student.forum.services.UserService;
import com.elec5619.student.forum.util.JsonReturnType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@Controller
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    CommentService commentService;

    @Autowired
    UserService userService;

    @Autowired
    DiscussionService discussionService;

    @GetMapping("/like/{id}")
    @ResponseBody
    public JsonReturnType likeComment(@PathVariable int id,Principal user){
        Comment comment = commentService.findByID(id);
        commentService.addLike(comment);
        User user1 = userService.getUserByNickName(user.getName());
        user1.getLikedComment().add(comment);
        userService.insert(user1);
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("comment",comment);
        jsonReturnType.flag = true;
        return jsonReturnType;
    }

    @GetMapping("/user/{id}")
    @ResponseBody
    public JsonReturnType findCommentsByUserId(@PathVariable int id){
        List<Comment> comments = commentService.findCommentByUserId(id);
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("comments",comments);
        jsonReturnType.flag = true;
        return jsonReturnType;
    }

    @GetMapping("/discussion/{id}")
    @ResponseBody
    public JsonReturnType findCommentsByDiscussionID(@PathVariable int id){
        List<Comment> comments = commentService.findCommentByDiscussionMain(id);
        for (Comment comment: comments) {
            comment.setJsonChildren(comment.getChildren());
            for (Comment childComment:comment.getJsonChildren()) {
                if(childComment.getTarget()!= null){
                    childComment.setTargetID(childComment.getTarget().getId());
                    childComment.setJsonTarget(childComment.getTarget());
                }
            }
        }
        JsonReturnType jsonReturnType = JsonReturnType.successReturn();
        jsonReturnType.getData().put("comments",comments);
        return jsonReturnType;

    }


    @GetMapping("/{id}")
    @ResponseBody
    public JsonReturnType findCommentByID(@PathVariable int id){
        Comment comment = commentService.findByID(id);
        comment.setJsonSender(comment.getSender());
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("comment",comment);
        jsonReturnType.flag = true;
        return jsonReturnType;
    }

    @PostMapping("/")
    @ResponseBody
    public JsonReturnType createComment(@RequestBody Comment comment, Principal user){
        comment.setDiscussion(discussionService.findById(comment.getDiscussionID()));
        if(comment.getIsCommentOfComment() != 0){
            comment.setParent(commentService.findByID(comment.getParentID()));
            if(comment.getTargetID() != -1){
                comment.setTarget(commentService.findByID(comment.getTargetID()));
            }
        }
        User user1 = userService.getUserByNickName(user.getName());
        comment.setSender(user1);
        commentService.insertOrUpdate(comment);
        if(comment.getIsCommentOfComment() != -0){
            Comment parent = commentService.findByID(comment.getParentID());
            parent.getChildren().add(comment);
            commentService.insertOrUpdate(parent);
            if(comment.getTargetID() != -1){
                Comment target = commentService.findByID(comment.getTargetID());
                target.getBeenTarget().add(comment);
                commentService.insertOrUpdate(target);
            }
        }
        JsonReturnType jsonReturnType = JsonReturnType.successReturn();
        jsonReturnType.getData().put("comment",comment);
        return jsonReturnType;
    }


}
