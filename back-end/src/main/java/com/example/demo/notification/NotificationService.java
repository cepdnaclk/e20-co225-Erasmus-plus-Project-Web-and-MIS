package com.example.demo.notification;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import com.example.demo.appuser.AppUserService;
import com.example.demo.appuser.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(String message, AppUser user, String notificationType){
        Notification notification = new Notification(message, user, notificationType);
        return notificationRepository.save(notification);
    }

    public List<Notification> getUserNotifications(Long userID) {
        AppUser user = appUserRepository.findById(userID).get();
        return notificationRepository.findByUser(user);
    }

    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
