package com.example.networking.messaging.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.networking.messaging.entity.ChatRoom;
import com.example.networking.messaging.model.ChatMessage.MessageType;

// 새로운 채팅룸 만들기 혹은 채팅룸 가져오기와 같은 CRUD 역할 
@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByChatType(MessageType chatType); // 채팅방 타입으로 채팅방 찾기

    @Query("SELECT cr FROM ChatRoom cr JOIN cr.participants p WHERE p.userId = :userId")
    List<ChatRoom> findByUserId(@Param("userId") Integer userId); // 유저 id로 찾기 

}