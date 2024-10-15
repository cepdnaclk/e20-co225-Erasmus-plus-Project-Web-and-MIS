package com.example.demo.task;

import com.example.demo.Deliverables.Deliverable;
import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import com.example.demo.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private AppUserRepository userRepository;
    @Autowired
    private NotificationService notificationService;


    public List<Task> getAllTasks(){
        return taskRepository.findAllOrderByTaskIDesc();
    }

    public Task getTask(int task_ID){
        return taskRepository.findById(task_ID).orElse(null);
    }

    public void addTask(Task newTask){

        taskRepository.save(newTask);
    }
    public void updateTask(Task updateTask){
        taskRepository.save(updateTask);
    }

    public void addUserToTask(int task_ID, long userID){
        Task task = taskRepository.findById(task_ID).get();
        AppUser user = userRepository.findById(userID).get();
        task.assignMember(user);
        taskRepository.save(task);
    }

    @Transactional
    public void addTaskWithUsers(Task task, Set<AppUser> taskMembers){

        taskRepository.save(task);
        task.assignMembers(taskMembers);
        for (AppUser taskMember : taskMembers) {
            notificationService.createNotification("You have been assigned a new task, " + task.getTask_Name(), taskMember,"typeTask");
        }
        taskRepository.save(task);


    }

    @Transactional
    public void updateTaskWithUsers(Task task, Set<AppUser> taskMembers){
        task.deleteAssignMembers();
        for (AppUser taskMember : taskMembers) {
            task.assignMember(taskMember);
            notificationService.createNotification("The task, " + task.getTask_Name() + " has been updated.", taskMember,"typeTask");
        }
        taskRepository.save(task);
    }

    public void deleteTask(int task_ID){
        taskRepository.deleteById(task_ID);
    }


    public List<Task> findUserTasks(Long userID) {
        AppUser user = userRepository.findById(userID).get();
        return taskRepository.findTasksByUser(user);
    }

}


