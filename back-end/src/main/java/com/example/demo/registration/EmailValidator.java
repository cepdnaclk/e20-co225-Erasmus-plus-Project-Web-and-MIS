package com.example.demo.registration;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;

/**
 * Service class for validating email addresses using a Predicate.
 * Implements Predicate<String> to provide a test method for email validation.
 */
@Service
public class EmailValidator implements Predicate<String> {

    /**
     * Tests whether the given string is a valid email address.
     *
     * @param email the email address to validate
     * @return true if the email is valid, false otherwise
     */
    @Override
    public boolean test(String s) {
//        TODO: Regex to validate email
        return true;
    }
}
