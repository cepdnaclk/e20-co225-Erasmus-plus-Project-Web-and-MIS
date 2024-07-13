package com.example.demo.registration;

import lombok.*;

/**
 * Data Transfer Object (DTO) for handling login credentials.
 */
@Setter
@Getter
@Data
// Login Data Transfer Object
public class LoginDTO {
    private String email;
    private String password;

    public LoginDTO() {
    }

    /**
     * Constructor for LoginDTO with parameters.
     */
    public LoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

}

