package com.example.demo.projectSummary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/latest")
    public ResponseEntity<Project> getLatestProject() {
        Project latestProject = projectService.getLatestProject()
                .orElseThrow(() -> new ResourceNotFoundException("No projects found"));
        return ResponseEntity.ok(latestProject);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project newProject) {
        Project project = projectService.createProject(newProject);
        return ResponseEntity.ok(project);
    }

    @PutMapping("/{projectSummaryId}")
    public ResponseEntity<Project> updateProject(@PathVariable Long projectSummaryId,
                                                 @RequestBody Project updatedProject) {
        Project project = projectService.updateProject(projectSummaryId,
                updatedProject.getStatus(),
                updatedProject.getEndDate());
        return ResponseEntity.ok(project);
    }
}