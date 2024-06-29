package com.example.demo.registration.token;

import com.example.demo.appuser.AppUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Represents a token used for user account confirmation.
 * This class is a JPA entity mapped to a database table.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
public class ConfirmationToken {

    /**
     * The sequence generator for generating unique IDs for tokens.
     */
    @SequenceGenerator(
            name = "confirmation_token_sequence",
            sequenceName = "confirmation_token_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "confirmation_token_sequence"
    )

    private Long id;
    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    private LocalDateTime confirmedAt;

    /**
     * The AppUser associated with this token.
     * Many tokens can belong to one AppUser.
     * This field is mandatory and cannot be null.
     */
    @ManyToOne
    @JoinColumn(
            name = "app_user_id",
            nullable = false
    )
    private AppUser appUser;

    /**
     * Constructs a new ConfirmationToken with the specified details.
     */
    public ConfirmationToken(String token,
                             LocalDateTime createdAt,
                             LocalDateTime expiredAt,
                             AppUser appUser) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiredAt;
        this.appUser = appUser;
    }
}
