package com.example.demo.registration.token;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Service class for managing ConfirmationToken entities.
 * This class handles operations such as saving tokens, retrieving tokens by token string,
 * and updating the confirmedAt timestamp of tokens.
 */
@Service
@AllArgsConstructor
public class ConfirmationTokenService {
    private final ConfirmationTokenRepository confirmationTokenRepository;

    /**
     * Saves a ConfirmationToken in the database.
     */
    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    /**
     * Retrieves a ConfirmationToken by its token string.
     */
    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

    /**
     * Sets the confirmedAt timestamp of a ConfirmationToken.
     */
    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}
