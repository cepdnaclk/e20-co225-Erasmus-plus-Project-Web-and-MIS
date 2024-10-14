package com.example.demo.task;

import com.example.demo.appuser.AppUser;
import com.example.demo.news.NewsAndEvents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

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

    @Query("SELECT t FROM Task t ORDER BY t.Task_ID DESC")
    List<Task> findAllOrderByTaskIDesc();

}

