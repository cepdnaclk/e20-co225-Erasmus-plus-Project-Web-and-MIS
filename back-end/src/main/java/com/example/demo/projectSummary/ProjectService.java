package com.example.demo.projectSummary;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import com.example.demo.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private AppUserService userService;
    @Autowired
    private NotificationService notificationService;


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
        List<AppUser> users = userService.getAllUsers();
        for (AppUser user : users) {
            notificationService.createNotification("Project Summary has been updated!", user,"typeProjectSummary");
        }
        return projectRepository.save(project); // To save the updated data to the database
    }
}