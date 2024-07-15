package com.example.demo.Deliverables;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class DeliverableNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(DeliverableNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,String> exceptionHandler(DeliverableNotFoundException e) {
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("message",e.getMessage());
        return errorMap;
    }
}
