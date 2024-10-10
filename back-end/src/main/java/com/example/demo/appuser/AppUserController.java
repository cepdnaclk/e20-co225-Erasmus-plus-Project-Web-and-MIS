package com.example.demo.appuser;


import com.example.demo.task.Task;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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

    @PostMapping("/getUserByEmail")
    public AppUser getUserByEmail(@RequestBody EmailRequest email){return appUserService.getUserAndCheckingByEmail(email);}
}