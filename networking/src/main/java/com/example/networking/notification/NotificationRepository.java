package com.example.networking.notification;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReceiver(String receiver);
    Optional<Notification> findByLikerAndReceiverAndPostId(String liker, String receiver, Long postId);
}