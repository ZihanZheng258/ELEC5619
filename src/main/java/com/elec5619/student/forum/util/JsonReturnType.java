package com.elec5619.student.forum.util;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;

@Getter
@Setter
public class JsonReturnType {
    public HashMap<String,Object> data = new HashMap<String,Object>();
    public boolean flag = true;
    public String message = "";
    public JsonReturnType(){

    }

    public JsonReturnType(boolean flag, String message){
        this.flag = flag;
        this.message = message;

    }
}
