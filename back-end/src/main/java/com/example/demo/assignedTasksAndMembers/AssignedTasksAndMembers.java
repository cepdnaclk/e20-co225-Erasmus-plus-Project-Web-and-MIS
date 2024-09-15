package com.example.demo.assignedTasksAndMembers;//package com.example.demo.assignedTasksAndMembers;


import com.example.demo.appuser.AppUser;
import com.example.demo.task.Task;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "AssignedTasksAndMembers")
public class AssignedTasksAndMembers {

    @Id
    //Auto generating values
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int assignment_ID;

    @ManyToOne
    private Task Task;
    @ManyToOne
    private AppUser taskMember;
    private LocalDate assignmentDate;
    private float Progress;


    private String timeSheetURL;

    public AssignedTasksAndMembers(){

    }

    public AssignedTasksAndMembers (int assignment_ID,Task task, AppUser taskMember, LocalDate assignmentDate,float progress ){
        this.assignment_ID = assignment_ID;
        this.Task = task;
        this.taskMember = taskMember;
        this.assignmentDate = assignmentDate;
        this.Progress = progress;
    }



}
