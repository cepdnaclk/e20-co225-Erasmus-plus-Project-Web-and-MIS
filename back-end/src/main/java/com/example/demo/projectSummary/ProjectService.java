package com.example.demo.projectSummary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Optional<Project> getLatestProject() {
        return projectRepository.findTopByOrderByIdDesc();
    }


    public Project createProject(Project newProject) {
        return projectRepository.save(newProject);  // Save new project to database
    }

    public Project updateProject(Long projectSummaryId, String projectSummaryStatus, LocalDate projectSummaryEndDate) {
        Project project = projectRepository.findById(projectSummaryId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        project.setStatus(projectSummaryStatus);
        project.setEndDate(projectSummaryEndDate);
        return projectRepository.save(project); // To save the updated data to the database
    }
}