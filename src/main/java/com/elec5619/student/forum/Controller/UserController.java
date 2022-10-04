package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.User;
import com.elec5619.student.forum.services.UserService;
import com.elec5619.student.forum.util.JsonReturnType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    @ResponseBody
    public JsonReturnType GetUserByID(@PathVariable int id){
        User user = userService.getUserByID(id);
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("user",user);
        jsonReturnType.flag = true;
        return jsonReturnType;
    }
}
