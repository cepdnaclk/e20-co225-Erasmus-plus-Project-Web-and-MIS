package com.example.demo.task;


import com.example.demo.appuser.AppUser;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.Set;

public class TaskDTO {

    private Task task;
    private Set<AppUser> assignedUsers;
    private MultipartFile financialReport;

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Set<AppUser> getTaskMembers(){
        return assignedUsers;
    }

    public void setAssignedUsers(Set<AppUser> assignedUsers) {this.assignedUsers = assignedUsers;}

    public MultipartFile getFinancialReport() {return financialReport;}

    public void setFinancialReport(MultipartFile financialReport) {this.financialReport = financialReport;}
}
