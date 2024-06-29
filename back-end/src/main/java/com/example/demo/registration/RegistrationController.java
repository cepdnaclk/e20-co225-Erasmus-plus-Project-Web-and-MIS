package com.example.demo.registration;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for handling registration and login endpoints.
 */
@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    /**
     * Endpoint for user registration.
     *
     * @param request the registration request containing user details
     * @return a message indicating the result of the registration process
     */
    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    /**
     * Endpoint for confirming registration via token.
     *
     * @param token the confirmation token sent to the user's email
     * @return a message indicating the result of the token confirmation process
     */
    @GetMapping("confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }

    /**
     * Endpoint for user login.
     *
     * @param loginDTO the DTO containing user's email and password for login
     * @return ResponseEntity containing login response with authentication token and message
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        LoginResponse loginResponse = registrationService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}
