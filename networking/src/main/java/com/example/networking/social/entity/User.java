package com.example.networking.social.entity;

import java.sql.Blob;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String nickname;
    private String email;
    private String password;
    private String area;
    private String jobStatus;
    private String industry;
    private String education;
    private String skill;
    private String cert;
    private String bio;
    private String company;
    private String title;
    private Blob profileImage;
    private Blob resumeFile;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}