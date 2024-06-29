package com.example.demo.appuser;

import com.example.demo.registration.token.ConfirmationToken;
import com.example.demo.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.Optional;

/**
 * Service class responsible for managing application users.
 * Implements UserDetailsService to provide user authentication functionality.
 */
@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    /**
     * Loads user details by username (email).
     */
    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, email)));
    }

    /**
     * Retrieves an AppUser by email.
     */
    public Optional<AppUser> getUserByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    /**
     * Signs up a new user.
     */
    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository.findByEmail(
                appUser.getEmail()).isPresent();
        if (userExists) {
            throw new IllegalStateException("Email already exists");
        }

        String encodePassword = bCryptPasswordEncoder.encode(appUser.getPassword());

        appUser.setPassword(encodePassword);
        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);
        // TODO: SEND EMAIL
        return token;
    }

    /**
     * Enables an app user account.
     */
    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }
}
