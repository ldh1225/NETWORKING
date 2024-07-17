package com.example.networking.notification;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private static final Logger logger = LoggerFactory.getLogger(NotificationController.class);

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/like")
    public ResponseEntity<?> sendLikeNotification(@RequestBody LikeNotificationRequest likeNotificationRequest) {
        logger.info("Received like notification request: liker={}, targetUser={}, postId={}",
                likeNotificationRequest.getLiker(), likeNotificationRequest.getTargetUser(), likeNotificationRequest.getPostId());
        notificationService.sendLikeNotification(likeNotificationRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> fetchNotifications(@PathVariable String userId) {
        logger.info("Fetching notifications for userId: {}", userId);
        List<Notification> notifications = notificationService.fetchNotifications(userId);
        return ResponseEntity.ok(notifications);
    }
}

