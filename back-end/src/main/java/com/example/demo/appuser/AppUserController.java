package com.example.demo.appuser;


import com.example.demo.task.Task;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")

public class AppUserController {

    @Autowired
    private AppUserService appUserService;

    @GetMapping
    public List<AppUser> getUserList(){
        return appUserService.getAllUsers();
    }


    @GetMapping("/{userID}")
    public AppUser getUser(@PathVariable Integer userID){
        return appUserService.getUser(userID);
    }

}
