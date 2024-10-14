package com.example.demo.task;

import com.example.demo.appuser.AppUser;
import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY-MM-DD")
    private LocalDate Start_Date;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY-MM-DD")
    private LocalDate End_Date;
    private String Description;
    private float Progress;
    @Lob
    @Column(name = "FinancialReport", columnDefinition = "LONGBLOB")
    private byte[] FinancialReport;

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

    public Task(int task_ID, String task_Name, LocalDate start_Date, LocalDate end_Date,  String description, float progress,byte[] financialReport) {
        Task_ID = task_ID;
        Task_Name = task_Name;
        Start_Date = start_Date;
        End_Date = end_Date;
        Description = description;
        Progress = progress;
        FinancialReport = financialReport;
    }

    public Task( String task_Name, LocalDate start_Date, LocalDate end_Date,  String description, float progress,byte[] financialReport) {
        Task_Name = task_Name;
        Start_Date = start_Date;
        End_Date = end_Date;
        Description = description;
        Progress = progress;
    }

    public int getTask_ID() {return Task_ID;}

    public void setTask_ID(int task_ID) {Task_ID = task_ID;}

    public String getTask_Name() {return Task_Name;}

    public void setTask_Name(String task_Name) {Task_Name = task_Name;}

    public LocalDate getStart_Date() {return Start_Date;}

    public void setStart_Date(LocalDate start_Date) {Start_Date = start_Date;}

    public LocalDate getEnd_Date() {return End_Date;}

    public void setEnd_Date(LocalDate end_Date) {End_Date = end_Date;}

    public String getDescription() {return Description;}

    public void setDescription(String description) {Description = description;}

    public float getProgress() {return Progress;}

    public void setProgress(float progress) {Progress = progress;}

    public byte[] getFinancialReport(){return FinancialReport;}

    public void setFinancialReport(byte[] financialReport){FinancialReport=financialReport;}

    public Set<AppUser> getAssignedUsers() {return assignedUsers;}



    public void assignMembers(Set<AppUser> taskMembers) {
        assignedUsers.clear();
        assignedUsers.addAll(taskMembers);
    }

    public void deleteAssignMembers() {assignedUsers.clear();}


    public void assignMember(AppUser user) {
        assignedUsers.add(user);
    }
}
