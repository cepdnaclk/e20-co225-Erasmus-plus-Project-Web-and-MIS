package com.example.demo.Workplan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkplanRepository extends JpaRepository<WorkplanActivity, String> {
}


