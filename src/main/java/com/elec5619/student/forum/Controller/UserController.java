package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.User;
import com.elec5619.student.forum.services.UserService;
import com.elec5619.student.forum.util.JsonReturnType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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

    @PutMapping("/password")
    @ResponseBody
    public JsonReturnType modifyPassword(@RequestBody String password,Principal user){
        User user1 = userService.getUserByNickName(user.getName());
        user1.setPassword(password);
        userService.encryptPassword(user1);
        userService.insert(user1);
        JsonReturnType jsonReturnType = JsonReturnType.successReturn();
        jsonReturnType.getData().put("user",user1);
        return jsonReturnType;
    }


    @GetMapping("/self")
    @ResponseBody
    public JsonReturnType GetUserByID(Principal principal){
        User user = userService.getUserByNickName(principal.getName());
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("user",user);
        jsonReturnType.flag = true;
        return jsonReturnType;
    }
}
