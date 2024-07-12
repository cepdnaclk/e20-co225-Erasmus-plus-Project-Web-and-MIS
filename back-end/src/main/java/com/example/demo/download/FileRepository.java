package com.example.demo.download;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
 * Repository interface for managing FileEntity entities.
 */

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {
}
