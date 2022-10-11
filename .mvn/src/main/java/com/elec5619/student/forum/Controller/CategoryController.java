package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.pojos.Category;
import com.elec5619.student.forum.pojos.Discussion;
import com.elec5619.student.forum.services.CategoryService;
import com.elec5619.student.forum.util.JsonReturnType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/")
    @ResponseBody
    public JsonReturnType getAllCategory(){
        List<Category> categories= categoryService.findAllCategory();
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        jsonReturnType.getData().put("categories",categories);
        return jsonReturnType;
    }

    @PostMapping("/")
    @ResponseBody
    public JsonReturnType AddNewCategory(@RequestBody Category category){
        JsonReturnType jsonReturnType = new JsonReturnType();
        jsonReturnType.setFlag(true);
        jsonReturnType.setMessage("");
        categoryService.insertOrUpdateCategory(category);
        jsonReturnType.getData().put("Category",category);
        return jsonReturnType;
    }
}
