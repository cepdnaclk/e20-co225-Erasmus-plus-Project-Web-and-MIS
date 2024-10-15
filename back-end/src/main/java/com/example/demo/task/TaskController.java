package com.example.demo.task;

import com.example.demo.appuser.AppUser;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/v1/tasks")

@AllArgsConstructor
public class TaskController {

    final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MMM-dd");

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getTaskList(){
        return taskService.getAllTasks();
    }

    @GetMapping("/{taskID}")
    public Task getTask(@PathVariable Integer taskID){
        return taskService.getTask(taskID);
    }

    @GetMapping("/users/{userID}")
    public List<Task> getUserTask(@PathVariable Long userID){
        System.out.println("TASKS + "+taskService.findUserTasks(userID));
        return taskService.findUserTasks(userID);
    }

    @PostMapping("/addWithUsers")
    public ResponseEntity<String> addTaskWithUsers(@RequestParam("task_Name") String task_Name,
                                                   @RequestParam("start_Date") String start_Date,
                                                   @RequestParam("end_Date") String end_Date,
                                                   @RequestParam(required = false, name ="progress") String progress,
                                                   @RequestParam(required = false, name ="description") String description,
                                                   @RequestParam(required = false, name ="assignedUsers") String assignedUsers,
                                                   @RequestParam(required = false, name ="financialReport")  MultipartFile receivedFinancialReport
                                                   ) throws JsonProcessingException {
        LocalDate startDate = LocalDate.parse(start_Date, DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate endDate = LocalDate.parse(end_Date, DateTimeFormatter.ISO_LOCAL_DATE);
        try {

            Task task = new Task(
                    task_Name,
                    startDate,
                    endDate,
                    description,
                    new Float(progress),
       null);
            ObjectMapper objectMapper = new ObjectMapper();
            Set<AppUser> taskMembers = new HashSet<>(objectMapper.readValue( assignedUsers, new TypeReference<Set<AppUser>>(){}));
            if (receivedFinancialReport != null) {
                byte[] financialReport = receivedFinancialReport.getBytes();
                task.setFinancialReport(financialReport);
            }
            taskService.addTaskWithUsers(task,taskMembers);
            return ResponseEntity.ok("Task added successfully");
        }catch (Exception e) {
return ResponseEntity.status(500).body("Failed to add task "+ e);
        }
    }


    @PutMapping("/updateWithUsers")
    public ResponseEntity<String> updateTaskWithUsers(@RequestParam("task_ID") String task_ID,
                                                      @RequestParam("task_Name") String task_Name,
                                                      @RequestParam("start_Date") String start_Date,
                                                      @RequestParam("end_Date") String end_Date,
                                                      @RequestParam(required = false, name ="progress") String progress,
                                                      @RequestParam(required = false, name ="description") String description,
                                                      @RequestParam(required = false, name ="assignedUsers") String assignedUsers,
                                                      @RequestParam(required = false, name ="financialReport")  MultipartFile receivedFinancialReport
                                                      ) throws JsonProcessingException {{

        LocalDate startDate = LocalDate.parse(start_Date, DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate endDate = LocalDate.parse(end_Date, DateTimeFormatter.ISO_LOCAL_DATE);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Set<AppUser> taskMembers = objectMapper.readValue(assignedUsers, new TypeReference<Set<AppUser>>(){});
            Task task = new Task(
                    new Integer(task_ID),
                    task_Name,
                    startDate,
                    endDate,
                    description,
                    new Float(progress),
                    null);
            if (receivedFinancialReport != null) {
                byte[] financialReport = receivedFinancialReport.getBytes();
                task.setFinancialReport(financialReport);
            }
            task.assignMembers(taskMembers);
            taskService.updateTask(task);
            taskService.updateTaskWithUsers(task, taskMembers);
            return ResponseEntity.ok("Task updated successfully");
        }catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update task "+e );
        }
    }
    }


    @DeleteMapping("/{taskID}")
    public ResponseEntity<String> deleteTask(@PathVariable Integer taskID) {
        try {
            taskService.deleteTask(taskID);
            return ResponseEntity.ok("Task deleted successfully");
       }catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete task");
        }
    }




}
