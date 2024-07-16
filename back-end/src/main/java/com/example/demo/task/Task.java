package com.example.demo.task;

import com.example.demo.appuser.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Task")
public class Task {

    @Id
   //Auto generating values
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Task_ID;

    private String Task_Name;
    private LocalDate Start_Date;
    private LocalDate End_Date;
    private int Member_Count;
    private String Subtasks;
    private float Progress;

    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "assigned_tasks",
            joinColumns = @JoinColumn (name = "Task_ID"),
            inverseJoinColumns = @JoinColumn(name = "User_ID")

    )
    @JsonIgnoreProperties("app_user")
    private Set<AppUser> assignedUsers = new HashSet<>();

    public Task(){

    }

    public Task(int task_ID, String task_Name, LocalDate start_Date, LocalDate end_Date, int member_Count, String subtasks, float progress) {
        Task_ID = task_ID;
        Task_Name = task_Name;
        Start_Date = start_Date;
        End_Date = end_Date;
        Member_Count = member_Count;
        Subtasks = subtasks;
        Progress = progress;
    }

    public int getTask_ID() {
        return Task_ID;
    }

    public void setTask_ID(int task_ID) {
        Task_ID = task_ID;
    }

    public String getTask_Name() {
        return Task_Name;
    }

    public void setTask_Name(String task_Name) {
        Task_Name = task_Name;
    }

    public LocalDate getStart_Date() {
        return Start_Date;
    }

    public void setStart_Date(LocalDate start_Date) {
        Start_Date = start_Date;
    }

    public LocalDate getEnd_Date() {
        return End_Date;
    }

    public void setEnd_Date(LocalDate end_Date) {
        End_Date = end_Date;
    }

    public int getMember_Count() {
        return Member_Count;
    }

    public void setMember_Count(int member_Count) {
        Member_Count = member_Count;
    }

    public String getSubtasks() {
        return Subtasks;
    }

    public void setSubtasks(String subtasks) {
        Subtasks = subtasks;
    }

    public float getProgress() {
        return Progress;
    }

    public void setProgress(float progress) {
        Progress = progress;
    }

    public Set<AppUser> getAssignedUsers() {
        return assignedUsers;
    }

    public void assignMember(AppUser user) {
        assignedUsers.add(user);
    }

    public void deleteAssignMember(AppUser user) {
        assignedUsers.remove(user);
    }

    public void setAssignedMembers(Set<AppUser> taskMembers){
        for (AppUser taskMember : taskMembers) {
            assignMember(taskMember);}
        }

}
