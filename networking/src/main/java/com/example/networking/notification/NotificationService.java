package com.example.networking.notification;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    @Autowired
    private NotificationRepository notificationRepository;

    public void sendLikeNotification(LikeNotificationRequest likeNotificationRequest) {
        try {
            Notification notification = new Notification();
            notification.setMessage(likeNotificationRequest.getLiker() + " liked your post");
            notification.setReceiver(likeNotificationRequest.getTargetUser());
            notification.setJob(false);
            LocalDateTime now = LocalDateTime.now();
            notification.setNotificationTime(now);
            notification.setCreatedAt(now);
            notification.setUpdatedAt(now);

            logger.info("Saving notification: {}", notification);
            notificationRepository.save(notification);
            logger.info("Notification saved successfully");
        } catch (Exception e) {
            logger.error("Error saving notification: ", e);
        }
    }

    public List<Notification> fetchNotifications(String userId) {
        try {
            logger.info("Fetching notifications for userId: {}", userId);
            List<Notification> notifications = notificationRepository.findByReceiver(userId);
            logger.info("Fetched {} notifications", notifications.size());
            return notifications;
        } catch (Exception e) {
            logger.error("Error fetching notifications: ", e);
            return null;
        }
    }
}
