package com.example.demo.myFiles;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
/*
 * Repository interface for managing MyFileEntity entities.
 */
@Repository
public interface MyFileRepository extends JpaRepository<MyFileEntity, Long> {


    List<MyFileEntity> findByEmail(String email);
}