package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.daos.CommentDao;
import com.elec5619.student.forum.daos.DiscussionDao;
import com.elec5619.student.forum.daos.UserDao;
import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.Notice;
import com.elec5619.student.forum.pojos.User;
import com.elec5619.student.forum.services.CommentService;
import com.elec5619.student.forum.services.DiscussionService;
import com.elec5619.student.forum.services.NoticeService;
import com.elec5619.student.forum.services.UserService;
import com.elec5619.student.forum.util.JsonReturnType;
import org.checkerframework.checker.units.qual.N;
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

    @Autowired
    NoticeService noticeService;

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

    @GetMapping("/cancelLike/{id}")
    @ResponseBody
    public JsonReturnType cancelLikeComment(@PathVariable int id,Principal user){
        Comment comment = commentService.findByID(id);
        commentService.addLike(comment,-1);
        User user1 = userService.getUserByNickName(user.getName());
        user1.getLikedComment().remove(comment);
        comment.getLiker().remove(user1);
        commentService.insertOrUpdate(comment);
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
            comment.setJsonSender(comment.getSender());
            for (Comment childComment:comment.getJsonChildren()) {
                childComment.setJsonSender(childComment.getSender());
                if(childComment.getTarget()!= null){
                    childComment.setTargetID(childComment.getTarget().getId());
                    childComment.setTargetName(childComment.getTarget().getSender().getNickName());
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
        Discussion discussion = discussionService.findById(comment.getDiscussionID());
        comment.setDiscussion(discussion);
        if(comment.getIsCommentOfComment() != 0){
            comment.setParent(commentService.findByID(comment.getParentID()));
            if(comment.getTargetID() != -1){
                comment.setTarget(commentService.findByID(comment.getTargetID()));
            }
        }
        User user1 = userService.getUserByNickName(user.getName());
        comment.setSender(user1);
        commentService.insertOrUpdate(comment);
        noticeService.insertNewNotice(user1,discussion.getUser(),user1.getNickName()+" send comment to " +
                "your discussion");

        if(comment.getIsCommentOfComment() != 0){
            Comment parent = commentService.findByID(comment.getParentID());
            parent.getChildren().add(comment);
            commentService.insertOrUpdate(parent);
            noticeService.insertNewNotice(user1,parent.getSender(),user1.getNickName()+" send comment to " +
                    "your comment");
            if(comment.getTargetID() != -1){
                Comment target = commentService.findByID(comment.getTargetID());
                target.getBeenTarget().add(comment);
                commentService.insertOrUpdate(target);
                noticeService.insertNewNotice(user1,target.getSender(),user1.getNickName()+" send comment to " +
                        "your comment");
            }
        }
        JsonReturnType jsonReturnType = JsonReturnType.successReturn();
        jsonReturnType.getData().put("comment",comment);
        return jsonReturnType;
    }


}
