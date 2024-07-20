package com.example.networking.social.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int authNo;

    private String authority;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    public UserAuth() {
    }

    public UserAuth(String authority, Users users) {
        this.authority = authority;
        this.users = users;
    }
}
