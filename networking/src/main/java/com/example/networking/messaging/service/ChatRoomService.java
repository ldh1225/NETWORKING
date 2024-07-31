package com.example.networking.messaging.service;

import com.example.networking.messaging.entity.ChatRoom;
import com.example.networking.messaging.model.ChatMessage.MessageType;
import com.example.networking.messaging.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatRoomService {
    
    @Autowired
    private ChatRoomRepository chatRoomRepository;

    // 채팅방 만들기
    public ChatRoom createChatRoom(ChatRoom chatRoom) {
        if (chatRoom.getPassword() != null && !chatRoom.getPassword().isEmpty()) {
            chatRoom.setSecret(true);
        } else {
            chatRoom.setSecret(false);
        }
        return chatRoomRepository.save(chatRoom);
    }

    // 채팅방 id로 채팅방 찾기
    public Optional<ChatRoom> getChatRoomById(Long chatRoomId) {
        return chatRoomRepository.findById(chatRoomId);
    }

    // 채팅방 정보 업데이트하기 
    public ChatRoom updateChatRoom(ChatRoom chatRoom) {
        if (chatRoom.getPassword() != null && !chatRoom.getPassword().isEmpty()) {
            chatRoom.setSecret(true);
        } else {
            chatRoom.setSecret(false);
        }
        return chatRoomRepository.save(chatRoom);
    }

    // 모든 그룹채팅방 찾기 
    public List<ChatRoom> getAllGroupChatRooms() {
        return chatRoomRepository.findByChatType(MessageType.GROUP_CHAT);
    }

    // 채팅방 id로 비밀채팅방 찾기 
    public Optional<ChatRoom> getSecretChatRoomById(Long chatRoomId, String password) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(chatRoomId);
        if (chatRoom.isPresent() && chatRoom.get().getPassword().equals(password)) {
            return chatRoom;
        } else {
            return Optional.empty();
        }
    }

    // 모든 채팅방 찾기 
    public List<ChatRoom> getAllChatRooms() {
        return chatRoomRepository.findAll();
    }

    // 채팅방 비밀번호 확인
    public boolean validateChatRoomPassword(Long chatRoomId, String password) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(chatRoomId);
        return chatRoom.isPresent() && chatRoom.get().getPassword().equals(password);
    }
    
    // 유저가 참여한 모든 채팅방 찾기
    public List<ChatRoom> getChatRoomsByUserId(Integer userId) {
        return chatRoomRepository.findByUserId(userId);
    }

    // 채팅방 삭제하기
    public boolean deleteChatRoom(Long chatRoomId) {
    Optional<ChatRoom> chatRoom = chatRoomRepository.findById(chatRoomId);
    if (chatRoom.isPresent()) {
        chatRoomRepository.delete(chatRoom.get());
        return true;
    } else {
        return false;
    }
}

}
