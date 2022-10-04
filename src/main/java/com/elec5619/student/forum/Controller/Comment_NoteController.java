package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.pojos.Comment;
import com.elec5619.student.forum.pojos.Comment_Note;
import com.elec5619.student.forum.pojos.User;
import com.elec5619.student.forum.services.*;
import com.elec5619.student.forum.util.JsonReturnType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/noteComment")
public class Comment_NoteController {
    @Autowired
    NoteCommentService commentService;

    @Autowired
    UserService userService;

    @Autowired
    NoteService noteService;

    @GetMapping("/like/{id}")
    @ResponseBody
    public JsonReturnType likeComment(@PathVariable int id){
        Comment_Note comment = commentService.findByid(id);
        commentService.addLikeNumber(id);
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("comment",comment);
        jsonReturnType.flag = true;
        return jsonReturnType;
    }

    @GetMapping("/user/{id}")
    @ResponseBody
    public JsonReturnType findCommentsByUserId(@PathVariable int id){
        List<Comment_Note> comments = commentService.findCommentByUser(id);
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("comments",comments);
        jsonReturnType.flag = true;
        return jsonReturnType;
    }

    @GetMapping("/note/{id}")
    @ResponseBody
    public JsonReturnType findCommentsByNoteID(@PathVariable int id){
        List<Comment_Note> comments = commentService.findCommentByNoteMain(id);
        for (Comment_Note comment: comments) {
            comment.setJsonChildren(comment.getChildren());
            for (Comment_Note childComment:comment.getJsonChildren()) {
                if(childComment.getTarget()!= null){
                    childComment.setTargetID(childComment.getTarget().getId());
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
        Comment_Note comment = commentService.findByid(id);
        comment.setJsonUser(comment.getUser());
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("comment",comment);
        jsonReturnType.flag = true;
        return jsonReturnType;
    }

    @PostMapping("/")
    @ResponseBody
    public JsonReturnType createComment(@RequestBody Comment_Note comment, Principal user){
        comment.setNote(noteService.findById(comment.getNoteID()));
        if(comment.getIsCommentOfComment() == 1){
            comment.setParent(commentService.findByid(comment.getParentID()));
            if(comment.getTargetID() != -1){
                comment.setTarget(commentService.findByid(comment.getTargetID()));
            }
        }
        User user1 = userService.getUserByNickName(user.getName());
        comment.setUser(user1);
        commentService.insertOrUpdate(comment);
        JsonReturnType jsonReturnType = JsonReturnType.successReturn();
        jsonReturnType.getData().put("comment",comment);
        return jsonReturnType;
    }
}
