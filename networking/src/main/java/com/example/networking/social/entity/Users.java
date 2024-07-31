package com.example.networking.social.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no;
    
    private String userId;
    private String userPw;
    private String userPwCheck;
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
    private Date regDate;
    private Date updDate;
    private int enabled;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore // 이 부분을 추가하여 직렬화 시 무시
    private List<Post> posts;
}
