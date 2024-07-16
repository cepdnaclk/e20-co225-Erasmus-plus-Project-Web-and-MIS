package com.example.demo.task;

import com.example.demo.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    //getAllTasks -> does every task is visible to everyone?
    //addTask (int Task_ID)
    //deleteTask (int Task_ID)
    //updateTask(Task updatedTask) -> assignTaskMembers

    @Query("SELECT t FROM Task t where ?1 member of t.assignedUsers")
    List<Task> findTasksByUser(AppUser user);

//    @Query("UPDATE Task t SET t.assignedUsers = :newAssignedUsers WHERE t.id = :taskId" )
//    void  updateAssignedMembers(Set<AppUser> newAssignedUsers,int taskId );
}

