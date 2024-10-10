package com.example.demo.projectSummary;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectSummaryId;

    private String projectSummaryStatus;

    private LocalDate projectSummaryEndDate;

    public Long getId() {
        return projectSummaryId;
    }

    public void setId(Long projectSummaryId) {
        this.projectSummaryId = projectSummaryId;
    }

    public String getStatus() {
        return projectSummaryStatus;
    }

    public void setStatus(String projectSummaryStatus) {
        this.projectSummaryStatus = projectSummaryStatus;
    }

    public LocalDate getEndDate() {
        return projectSummaryEndDate;
    }

    public void setEndDate(LocalDate projectSummaryEndDate) {
        this.projectSummaryEndDate = projectSummaryEndDate;
    }
}