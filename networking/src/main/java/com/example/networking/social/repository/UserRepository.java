package com.example.networking.social.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.networking.social.entity.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
    Optional<Users> findByUserId(String userId);
}
