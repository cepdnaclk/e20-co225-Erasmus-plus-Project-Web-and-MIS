package com.example.demo.task;

import com.example.demo.Deliverables.Deliverable;
import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

//    public void updateTask(Task task,int id){
//
//        Optional<Task> existingTask = taskRepository.findById(id);
//        if (existingTask.isPresent()) {
//            Task updatedTask = existingTask.get();
//
//            updatedTask.setTask_Name(task.getTask_Name());
//            updatedTask.setStart_Date(task.getStart_Date());
//            updatedTask.setEnd_Date(task.getEnd_Date());
//            updatedTask.setProgress(task.getProgress());
//            updatedTask.setAssignedUsers(task.getAssignedUsers());
////            return taskRepository.save(updatedTask);
//        taskRepository.save(updatedTask); //no need of ID, because instance is already there
//        }
//    }

    public void deleteTask(int task_ID){
        taskRepository.deleteById(task_ID);
    }


    public List<Task> findUserTasks(Long userID) {
        AppUser user = userRepository.findById(userID).get();
        return taskRepository.findTasksByUser(user);
    }
}

