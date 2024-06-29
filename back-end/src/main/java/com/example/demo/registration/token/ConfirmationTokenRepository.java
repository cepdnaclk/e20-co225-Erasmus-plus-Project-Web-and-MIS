package com.example.demo.registration.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Repository interface for managing ConfirmationToken entities.
 * Extends JpaRepository to provide basic CRUD operations and custom queries.
 */
@Repository
@Transactional(readOnly = true)
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {

    Optional<ConfirmationToken> findByToken(String token);

    /**
     * Updates the confirmedAt timestamp of a ConfirmationToken.
     * This method uses a custom JPQL query to update the confirmedAt field of the token.
     */
    @Transactional
    @Modifying
    @Query("update ConfirmationToken c " +
            "SET c.confirmedAt = ?2 " +
            "WHERE c.token = ?1")
    int updateConfirmedAt(String token, LocalDateTime confirmedAt);
}
