package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.services.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/discussion")
public class DiscussionController {

    @Autowired
    DiscussionService discussionService;

    @GetMapping("/like/{id}")
    @ResponseBody
    public Discussion likeDiscussion(@PathVariable int id){
        Discussion discussion = discussionService.findById(id);
        if(discussion == null){
            System.out.println("\n\n\n\n\n\n\n\n\n");
        }
        discussionService.beenLiked(discussion);
        return discussion;
    }
}
