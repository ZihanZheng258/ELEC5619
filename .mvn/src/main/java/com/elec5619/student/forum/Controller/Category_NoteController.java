package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.pojos.Category;
import com.elec5619.student.forum.pojos.Category_Note;
import com.elec5619.student.forum.services.NoteCategoryService;
import com.elec5619.student.forum.util.JsonReturnType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/noteCategory")
public class Category_NoteController {

    @Autowired
    NoteCategoryService noteCategoryService;

    @GetMapping("/")
    @ResponseBody
    public JsonReturnType getAllCategory(){
        List<Category_Note> categories= noteCategoryService.findAllCategory();
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        jsonReturnType.getData().put("categories",categories);
        return jsonReturnType;
    }

    @PostMapping("/")
    @ResponseBody
    public JsonReturnType AddNewCategory(@RequestBody Category_Note category){
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        noteCategoryService.insertCategory(category);
        jsonReturnType.getData().put("Category",category);
        return jsonReturnType;
    }
}
