package com.example.demo.task;

import com.example.demo.appuser.AppUser;

import java.util.Optional;
import java.util.Set;

public class TaskDTO {

    private Task task;
    private Set<AppUser> assignedUsers;

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Set<AppUser> getTaskMembers(){
        return assignedUsers;
    }

    public void setAssignedUsers(Set<AppUser> assignedUsers) {
        this.assignedUsers = assignedUsers;
    }
}
