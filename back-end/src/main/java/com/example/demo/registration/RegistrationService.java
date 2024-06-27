package com.example.demo.registration;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRole;
import com.example.demo.appuser.AppUserService;
import com.example.demo.email.EmailSender;
import com.example.demo.registration.token.ConfirmationToken;
import com.example.demo.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("Email is not valid");
        }

        String token = appUserService.signUpUser(
                new AppUser(request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        AppUserRole.USER)
        );
        String link = "localhost:8080/api/v1/registration/confirm?token=" + token;
//        emailSender.send(request.getEmail(),
//                buildEmail(request.getFirstName(), link));
       return token;
    }


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

    public LoginResponse loginUser(LoginDTO loginDTO) {
        Optional<AppUser> optionalAppUser = appUserService.getUserByEmail(loginDTO.getEmail());

        if (optionalAppUser.isEmpty()) {
            return new LoginResponse(null, "User not found");
        }

        AppUser appUser = optionalAppUser.get();

        if (appUser.getPassword().equals(loginDTO.getPassword())) {
            return new LoginResponse(null, "Incorrect Email and Password not match");
        } else {
            return new LoginResponse("dummy-token", "Login Success");
        }
    }
}

