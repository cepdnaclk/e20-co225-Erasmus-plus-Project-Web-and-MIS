package com.example.demo.appuser;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for managing AppUser entities.
 * Extends JpaRepository to provide basic CRUD operations and custom queries.
 */
@Repository
@Transactional(readOnly = true)
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);

    /**
     * Enables an AppUser by setting their enabled status to true.
     * This method uses a custom JPQL query to update the enabled status of the user.
     */
    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
    "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);
}
