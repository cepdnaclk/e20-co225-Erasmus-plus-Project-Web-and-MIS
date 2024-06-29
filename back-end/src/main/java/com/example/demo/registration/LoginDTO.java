package com.example.demo.registration;

import lombok.*;

/**
 * Data Transfer Object (DTO) for handling login credentials.
 */
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

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }
}

