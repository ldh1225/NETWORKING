package com.example.networking.dto;

import lombok.Data;

// 회원 권한
@Data
public class UserAuth {
    
    private int authNo;
    private String userId;
    private String auth;

    // User 객체를 포함하는 필드를 추가합니다.
    private Users user;

    public UserAuth() {}

    public UserAuth(String userId, String auth) {
        this.userId = userId;
        this.auth = auth;
    }

    // getter 메서드를 추가합니다.
    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
