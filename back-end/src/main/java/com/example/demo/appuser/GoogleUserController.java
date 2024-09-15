package com.example.demo.appuser;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoogleUserController {

    @GetMapping("/user-info")
    public UserDTO user(@AuthenticationPrincipal OAuth2User principal) {
        // If no user is authenticated, return null or an anonymous user response
        if (principal == null) {
            return null;  // Or you could return an anonymous/default user object
        }

        // Extract relevant user details and return them as a DTO
        String name = principal.getAttribute("name");  // Adjust key based on provider
        String email = principal.getAttribute("email");
        String picture = principal.getAttribute("picture");

        return new UserDTO(name, email, picture);
    }
}
