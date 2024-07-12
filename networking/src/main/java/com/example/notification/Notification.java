package com.example.notification;

public class Notification {
    // 알림 클래스의 필드 예제입니다.
    private String message;
    private String sender;
    private String receiver;

    // 기본 생성자
    public Notification() {}

    // 모든 필드를 포함한 생성자
    public Notification(String message, String sender, String receiver) {
        this.message = message;
        this.sender = sender;
        this.receiver = receiver;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }
}
