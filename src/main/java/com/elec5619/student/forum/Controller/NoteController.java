package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.pojos.Note;
import com.elec5619.student.forum.pojos.User;
import com.elec5619.student.forum.services.NoteCategoryService;
import com.elec5619.student.forum.services.NoteCommentService;
import com.elec5619.student.forum.services.NoteService;
import com.elec5619.student.forum.services.UserService;
import com.elec5619.student.forum.util.JsonReturnType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/note")
public class NoteController {

    @Autowired
    NoteService noteService;

    @Autowired
    UserService userService;

    @Autowired
    NoteCommentService noteCommentService;

    @Autowired
    NoteCategoryService noteCategoryService;

    @GetMapping("/wish/{id}")
    @ResponseBody
    public JsonReturnType wishNote(@PathVariable int id, Principal user){
        Note note = noteService.findById(id);
        User user1 = userService.getUserByNickName(user.getName());
        noteService.beenWished(note,user1.getId());
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("note",note);
        jsonReturnType.flag = true;
        return jsonReturnType;
    }

    @GetMapping("/buy/{id}")
    @ResponseBody
    public JsonReturnType buyNote(@PathVariable int id, Principal user){
        Note note = noteService.findById(id);
        User user1 = userService.getUserByNickName(user.getName());
        JsonReturnType jsonReturnType = new JsonReturnType();
        try{
            noteService.beenBuy(note,user1.getId());
            jsonReturnType.getData().put("note",note);
            jsonReturnType.flag = true;
        }
        catch (Exception e){
            jsonReturnType.setFlag(false);
            jsonReturnType.setMessage("credit not enough");
        }
        return jsonReturnType;
    }

    @GetMapping("/category/{id}")
    @ResponseBody
    public JsonReturnType getNoteForCategory(@PathVariable int id){
        JsonReturnType jsonReturnType = new JsonReturnType();
        List<Note> list = noteService.getNoteByCategory(id);
        jsonReturnType.getData().put("notes",list);
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        return jsonReturnType;
    }

    @GetMapping("/wisher/{id}")
    @ResponseBody
    public JsonReturnType getNoteForWisher(@PathVariable int id){
        JsonReturnType jsonReturnType = new JsonReturnType();
        List<Note> list = noteService.getNoteByWished(id);
        jsonReturnType.getData().put("notes",list);
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        return jsonReturnType;
    }

    @GetMapping("/buyer/{id}")
    @ResponseBody
    public JsonReturnType getNoteForBuyer(@PathVariable int id){
        JsonReturnType jsonReturnType = new JsonReturnType();
        List<Note> list = noteService.getNoteByBought(id);
        jsonReturnType.getData().put("notes",list);
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        return jsonReturnType;
    }

    @GetMapping("/owner/{id}")
    @ResponseBody
    public JsonReturnType getNoteForOwner(@PathVariable int id){
        JsonReturnType jsonReturnType = new JsonReturnType();
        List<Note> list = noteService.getNoteByOwned(id);
        jsonReturnType.getData().put("notes",list);
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        return jsonReturnType;
    }

    @PostMapping("/")
    @ResponseBody
    public JsonReturnType AddNewNote(@RequestBody Note note,Principal user){
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        User user1 = userService.getUserByNickName(user.getName());
        note.setCategory(noteCategoryService.getCategoryByID(user1.getId()));
        note.setOwner(user1);
        noteService.insertOrUpdate(note);
        jsonReturnType.getData().put("note",note);
        return jsonReturnType;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public JsonReturnType getNote(@PathVariable int id){
        Note note = noteService.findById(id);
        note.setJsonOwner(note.getOwner());
        note.setJsonCategory(note.getCategory());
        note.setJsonComments(note.getComments());
        note.setJsonWishers(note.getWishers());
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.getData().put("note",note);
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        return jsonReturnType;
    }


}
