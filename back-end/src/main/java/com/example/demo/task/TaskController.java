package com.example.demo.task;

import com.example.demo.appuser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/tasks")

@AllArgsConstructor
public class TaskController {

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

    @PostMapping
    public TaskResponse addTask(@RequestBody Task newTask){
        taskService.addTask(newTask);
        String s = "SUCCESS: new Task added";
        return new TaskResponse(s);
    }

    @PutMapping("/update")
    public void updateTask(@RequestBody Task updateTask){
        taskService.updateTask(updateTask);
    }

    @DeleteMapping("/{taskID}")
    public void deleteTask(@PathVariable Integer taskID){
        taskService.deleteTask(taskID);
    }

    @PutMapping("/{taskID}/users/{userID}")
    public void addUserToTask(@PathVariable Integer taskID,@PathVariable Long userID){

        taskService.addUserToTask(taskID,userID);
    }



}
