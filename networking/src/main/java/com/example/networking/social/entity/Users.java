package com.example.networking.social.entity;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.List;

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

    private String userId;           // 아이디
    private String userPw;           // 비밀번호
    private String name;             // 이름
    private String email;            // 이메일
    private String area;             // 지역
    private String status;           // 구직여부
    private String industry;         // 직무분야
    private String edu;              // 학력
    private String skill;            // 스킬
    private String cert;             // 자격증
    private String bio;              // 경력사항
    private String company;          // 소속
    private String title;            // 직급
    private Blob profileImage;       // 프로필 이미지
    private Blob resumeFile;         // 이력서 파일
    private LocalDateTime regDate;   // 등록시간
    private LocalDateTime updDate;   // 수정시간
    private int enabled;         // 활성화 여부

    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    private List<UserAuth> authList; 

    public Users() {
    }

    public Users(Users user) {
        this.no = user.getNo();
        this.userId = user.getUserId();
        this.userPw = user.getUserPw();
        this.name = user.getName();
        this.email = user.getEmail();
        this.area = user.getArea();
        this.status = user.getStatus();
        this.industry = user.getIndustry();
        this.edu = user.getEdu();
        this.skill = user.getSkill();
        this.cert = user.getCert();
        this.bio = user.getBio();
        this.company = user.getCompany();
        this.title = user.getTitle();
        this.profileImage = user.getProfileImage();
        this.resumeFile = user.getResumeFile();
        this.regDate = user.getRegDate();
        this.updDate = user.getUpdDate();
        this.enabled = user.getEnabled();
        this.authList = user.getAuthList();
    }

    public int getNo() {
        return this.no;
    }
    public int getEnabled() {
        return this.enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }
}