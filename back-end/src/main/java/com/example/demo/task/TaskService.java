package com.example.demo.task;

import com.example.demo.Deliverables.Deliverable;
import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
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


    public List<Task> getAllTasks(){
       return taskRepository.findAll();
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

    public void addTaskWithUsers(Task task, Set<AppUser> taskMembers){

        taskRepository.save(task);
        for (AppUser taskMember : taskMembers) {
            task.assignMember(taskMember);
        }
            taskRepository.save(task);

    }

    @Transactional
    public void updateTaskWithUsers(Task task, Set<AppUser> taskMembers){
        task.deleteAssignMembers();
        for (AppUser taskMember : taskMembers) {
            task.assignMember(taskMember);
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

    public void deleteTaskUsers(int taskID,Long userID){
        taskRepository.deleteUserFromTasks(taskID,userID);
    }
}


