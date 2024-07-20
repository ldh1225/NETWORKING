package com.example.networking.social.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.networking.social.entity.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
}