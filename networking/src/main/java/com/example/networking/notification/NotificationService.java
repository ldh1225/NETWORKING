package com.example.networking.notification;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
            Optional<Notification> existingNotification = notificationRepository.findByLikerAndReceiverAndPostId(
                likeNotificationRequest.getLiker(), likeNotificationRequest.getTargetUser(), likeNotificationRequest.getPostId());

            if (existingNotification.isPresent()) {
                Notification notification = existingNotification.get();
                if (notification.isLiked()) {
                    notification.setLiked(false);
                    notification.setMessage(likeNotificationRequest.getLiker() + "님이 당신의 게시물을 좋아요를 취소했습니다");
                } else {
                    notification.setLiked(true);
                    notification.setMessage(likeNotificationRequest.getLiker() + "님이 당신의 게시물을 좋아요를 눌렀습니다");
                }
                notification.setUpdatedAt(LocalDateTime.now());
                notificationRepository.save(notification);
                logger.info("Notification updated: {}", notification);
            } else {
                Notification notification = new Notification();
                notification.setMessage(likeNotificationRequest.getLiker() + "님이 당신의 게시물을 좋아요를 눌렀습니다");
                notification.setReceiver(likeNotificationRequest.getTargetUser());
                notification.setLiker(likeNotificationRequest.getLiker());
                notification.setPostId(likeNotificationRequest.getPostId());
                notification.setJob(false);
                notification.setLiked(true);
                LocalDateTime now = LocalDateTime.now();
                notification.setNotificationTime(now);
                notification.setCreatedAt(now);
                notification.setUpdatedAt(now);

                logger.info("Saving notification: {}", notification);
                notificationRepository.save(notification);
                logger.info("Notification saved successfully");
            }
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
