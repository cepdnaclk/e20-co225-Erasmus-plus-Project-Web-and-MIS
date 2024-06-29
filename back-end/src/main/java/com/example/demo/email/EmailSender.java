package com.example.demo.email;

/**
 * Interface for sending emails.
 */
public interface EmailSender {
    void send(String to, String email);
}
