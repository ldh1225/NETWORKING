package com.example.networking.messaging.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import com.example.networking.messaging.model.ChatMessage;
import com.example.networking.messaging.service.ChatService;

@Controller
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // 그룹메세지
    @MessageMapping("/chat.sendGroupMessage/{chatRoomId}")
    @SendTo("/topic/groupChatRoom/{chatRoomId}") 
    public ChatMessage sendGroupMessage(ChatMessage chatMessage) {
        logger.info("그룹채팅 메세지를 받았습니다.: {}", chatMessage);

        if (chatMessage.getMessage() == null || chatMessage.getMessage().isEmpty()) {
            logger.error("null 혹은 빈 메세지를 전달받았습니다: {}", chatMessage);
            throw new IllegalArgumentException("메세지는 null 혹은 빈 메세지일 수 없습니다.");
        }

        if (chatMessage.getSender() == null || chatMessage.getSender().isEmpty()) {
            logger.error("null 혹은 빈 닉네임을 전달받았습니다: {}", chatMessage);
            throw new IllegalArgumentException("닉네임은 null 혹은 빈 값일 수 없습니다.");
        }

        chatService.saveMessage(chatMessage); 
        return chatMessage;
    }

    // 1대1메세지 
    @MessageMapping("/chat.sendPrivateMessage")
    @SendToUser("/queue/user")
    public ChatMessage sendPrivateMessage(ChatMessage chatMessage) {
        logger.info("메세지 전달 완료: " + chatMessage.getMessage());
        chatService.saveMessage(chatMessage); 
        return chatMessage;
    }

    // 1대1채팅에 유저 추가
    @SuppressWarnings("null")
    @MessageMapping("/chat.addUser")
    @SendToUser("/queue/user")
    public ChatMessage addUser(ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        logger.info("유저 추가 완료: " + chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("nickname", chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("userId", chatMessage.getUserId().toString());
        chatMessage.setMessage(chatMessage.getSender() + "님이 들어왔습니다.");
        chatMessage.setType(ChatMessage.MessageType.JOIN);
        return chatMessage;
    }

    // 그룹채팅에 유저 추가 
    @SuppressWarnings("null")
    @MessageMapping("/chat.addUser/{chatRoomId}")
    @SendTo("/topic/groupChatRoom/{chatRoomId}")
    public ChatMessage addUserToRoom(ChatMessage chatMessage, @DestinationVariable String chatRoomId, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("nickname", chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("userId", chatMessage.getUserId().toString());
        headerAccessor.getSessionAttributes().put("chatRoomId", chatRoomId);
        chatMessage.setMessage(chatMessage.getSender() + "님이 들어왔습니다.");
        chatMessage.setType(ChatMessage.MessageType.JOIN);
        return chatMessage;
    }
}
