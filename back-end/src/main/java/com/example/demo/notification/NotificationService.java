package com.example.demo.notification;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final AppUserRepository appUserRepository;
    private final JavaMailSender mailSender;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, AppUserRepository appUserRepository, JavaMailSender mailSender) {
        this.notificationRepository = notificationRepository;
        this.appUserRepository = appUserRepository;
        this.mailSender = mailSender;
    }

    public Notification createNotification(String message, AppUser user, String notificationType) {
        Notification notification = new Notification(message, user, notificationType);
        notification = notificationRepository.save(notification);
        if ("typeTask".equals(notificationType)) {
            sendNotificationEmail(user.getEmail(), message);
        }
        return notification;
    }

    public List<Notification> getUserNotifications(Long userID) {
        AppUser user = appUserRepository.findById(userID).orElse(null);
        return notificationRepository.findByUser(user);
    }

    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    // Method to send email
    private void sendNotificationEmail(String toEmail, String message) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(toEmail);
        email.setSubject("New Notification from Erasmus+ CYCLE UOP");
        email.setText(message);
        mailSender.send(email);  // Send the email
    }
}
