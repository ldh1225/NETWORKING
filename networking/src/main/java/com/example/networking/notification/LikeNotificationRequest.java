package com.example.networking.notification;

public class LikeNotificationRequest {
    private String liker;
    private String targetUser;

    // getters and setters
    public String getLiker() {
        return liker;
    }

    public void setLiker(String liker) {
        this.liker = liker;
    }

    public String getTargetUser() {
        return targetUser;
    }

    public void setTargetUser(String targetUser) {
        this.targetUser = targetUser;
    }
}
