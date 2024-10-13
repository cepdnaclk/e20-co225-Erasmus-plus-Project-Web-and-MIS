package com.example.demo.notification;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import com.example.demo.appuser.EmailRequest;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final AppUserService appUserService;

    @Autowired
    public NotificationController(NotificationService notificationService, AppUserService appUserService){
        this.notificationService = notificationService;
        this.appUserService = appUserService;
    }

    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification newNotification ) {
        Notification notification = notificationService.createNotification(newNotification.getMessage(),newNotification.getUser(),newNotification.getNotificationType());
        return ResponseEntity.ok(notification);
    }

    @GetMapping("/{userID}")
    public List<Notification> getUserNotifications(@PathVariable Long userID) {
        List<Notification> notifications = notificationService.getUserNotifications(userID);
        return notifications;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}
