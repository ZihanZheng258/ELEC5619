package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.pojos.Notice;
import com.elec5619.student.forum.pojos.User;
import com.elec5619.student.forum.services.NoticeService;
import com.elec5619.student.forum.services.UserService;
import com.elec5619.student.forum.util.JsonReturnType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/notice")
public class NoticeController {
    @Autowired
    NoticeService noticeService;

    @Autowired
    UserService userService;

    @PostMapping("/")
    @ResponseBody
    public JsonReturnType createNotice(@RequestBody Notice notice,Principal user){
        User user1 = userService.getUserByNickName(user.getName());
        User user2 = userService.getUserByID(notice.getReceiverID());
        notice.setSender(user1);
        notice.setReceiver(user2);
        noticeService.insertOrUpdate(notice);
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        jsonReturnType.getData().put("notice",notice);
        return jsonReturnType;
    }

    @GetMapping("/read/{id}")
    @ResponseBody
    public JsonReturnType readNotice(@PathVariable int id){
        Notice notice = noticeService.findById(id);
        notice.setHaveRead(1);
        noticeService.insertOrUpdate(notice);
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        jsonReturnType.getData().put("notice",notice);
        return jsonReturnType;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public JsonReturnType getNotice(@PathVariable int id){
        Notice notice = noticeService.findById(id);
        notice.setJsonReceiver(notice.getReceiver());
        notice.setJsonSender(notice.getSender());
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        jsonReturnType.getData().put("notice",notice);
        return jsonReturnType;
    }

    @GetMapping("/sender/{id}")
    @ResponseBody
    public JsonReturnType getSendNotice(@PathVariable int id){
        List<Notice> list = noticeService.findBySender(id);
        for (Notice notice: list) {
            notice.setJsonReceiver(notice.getReceiver());
            notice.setJsonSender(notice.getSender());
        }
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        jsonReturnType.getData().put("notice",list);
        return jsonReturnType;
    }

    @GetMapping("receiver/{id}")
    @ResponseBody
    public JsonReturnType getReceiveNotice(@PathVariable int id){
        List<Notice> list = noticeService.findByReceiver(id);
        for (Notice notice: list) {
            notice.setJsonReceiver(notice.getReceiver());
            notice.setJsonSender(notice.getSender());
        }
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        jsonReturnType.getData().put("notice",list);
        return jsonReturnType;
    }



}
