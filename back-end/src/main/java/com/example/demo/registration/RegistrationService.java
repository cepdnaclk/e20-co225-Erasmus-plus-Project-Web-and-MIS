package com.example.demo.registration;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRole;
import com.example.demo.appuser.AppUserService;
import com.example.demo.email.EmailSender;
import com.example.demo.registration.token.ConfirmationToken;
import com.example.demo.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Service class responsible for user registration, email confirmation, and login operations.
 */
@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;
    private final PasswordEncoder passwordEncoder;

    /**
     * Registers a new user with the provided registration details.
     */
    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("Email is not valid");
        }

        // Sign up the user and get the confirmation token
        String token = appUserService.signUpUser(
                new AppUser(request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        AppUserRole.USER)
        );

        // Construct email confirmation link
        String link = "localhost:8080/api/v1/registration/confirm?token=" + token;
            //emailSender.send(request.getEmail(),
            //buildEmail(request.getFirstName(), link));
        return token;
    }


    /**
     * Confirms the registration token and enables the user account.
     */
    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new IllegalStateException("Token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token is expired");
        }
        confirmationTokenService.setConfirmedAt(token);
        appUserService.enableAppUser(
                confirmationToken.getAppUser().getEmail()
        );
        return "Confirmed!";
    }

    /**
     * Authenticates a user based on the provided login credentials.
     */
    public LoginResponse loginUser(LoginDTO loginDTO) {
        System.out.println("Login attempt with email: " + loginDTO.getEmail()); // Debug log

        Optional<AppUser> optionalAppUser = appUserService.getUserByEmail(loginDTO.getEmail());

        if (optionalAppUser.isEmpty()) {
            System.out.println("User not found with email: " + loginDTO.getEmail()); // Debug log
            return new LoginResponse(null, "Email does not exits");
        }

        AppUser appUser = optionalAppUser.get();

        System.out.println("User found, comparing passwords"); // Debug log

        if (passwordEncoder.matches(loginDTO.getPassword(), appUser.getPassword())) {
            System.out.println("Password match, login success"); // Debug log
            return new LoginResponse("dummy-token", "Login Success");
        } else {
            System.out.println("Password mismatch"); // Debug log
            return new LoginResponse(null, "Password does not match");
        }
    }
}