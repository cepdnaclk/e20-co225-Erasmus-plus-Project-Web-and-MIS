package com.example.demo.appuser;

public class UserDTO {
    private String name;
    private String email;
    private String picture;  // New field for profile picture

    public UserDTO(String name, String email, String picture) {
        this.name = name;
        this.email = email;
        this.picture = picture;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
