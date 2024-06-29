package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Configuration class for providing BCryptPasswordEncoder bean.
 */
@Configuration
public class PasswordEncoder {

    /**
     * Provides BCryptPasswordEncoder bean instance.
     */
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
