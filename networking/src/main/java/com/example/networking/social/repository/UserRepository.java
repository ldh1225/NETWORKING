package com.example.networking.social.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.networking.social.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}