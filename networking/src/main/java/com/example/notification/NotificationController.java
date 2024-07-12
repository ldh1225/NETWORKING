package com.example.notification;

import java.util.List;

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

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/like")
    public ResponseEntity<?> sendLikeNotification(@RequestBody Notification notification) {
        notificationService.sendLikeNotification(notification);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> fetchNotifications(@PathVariable String userId) {
        List<Notification> notifications = notificationService.fetchNotifications(userId);
        return ResponseEntity.ok(notifications);
    }
}
