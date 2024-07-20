package com.example.networking.social.dto;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.List;

import com.example.networking.dto.UserAuth;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {
    private int no;
    private String userId;
    private String userPw;
    private String name;
    private String email;
    private String area;
    private String status;
    private String industry;
    private String edu;
    private String skill;
    private String cert;
    private String bio;
    private String company;
    private String title;
    private Blob profileImage;
    private Blob resumeFile;
    private LocalDateTime regDate;
    private LocalDateTime updDate;
    private int enabled;
    private List<UserAuth> authList;
}