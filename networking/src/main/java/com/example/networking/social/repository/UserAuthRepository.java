package com.example.networking.social.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.networking.social.entity.UserAuth;

public interface UserAuthRepository extends JpaRepository<UserAuth, Long> {

}
