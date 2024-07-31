package com.example.networking.messaging.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.networking.messaging.entity.Chat;
import com.example.networking.messaging.model.ChatMessage;
import com.example.networking.messaging.service.ChatService;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@RestController
@RequestMapping("/api/chat/messages")
public class ChatMessageController {

    private static final Logger logger = LoggerFactory.getLogger(ChatMessageController.class);


    @Autowired
    private ChatService chatService;

    // 새로운 메세지 저장하기 
    @PostMapping
    public ResponseEntity<Chat> createChatMessage(@RequestBody ChatMessage chatMessage) {
        logger.info("메세지를 받았습니다.: {}", chatMessage);


        if (chatMessage.getMessage() == null || chatMessage.getMessage().isEmpty()) {
            logger.error("null 혹은 빈 메세지를 전달받았습니다.: {}", chatMessage);
            return ResponseEntity.badRequest().build();
        }

        Chat savedChat = chatService.saveMessage(chatMessage);
        logger.info("저장된 메세지를 보내고 있습니다.: {}", savedChat);
        return ResponseEntity.ok(savedChat);
    }

    // 채팅방 id로 채팅메세지 찾기
    @GetMapping("/room/{chatRoomId}")
    public ResponseEntity<List<Chat>> getMessagesByChatRoomId(@PathVariable Long chatRoomId) {
        List<Chat> messages = chatService.getMessagesByChatRoomId(chatRoomId);
        return ResponseEntity.ok(messages);
    }

    // 유저 id로 채팅메세지 찾기
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Chat>> getMessagesByUserId(@PathVariable Integer userId) {
        List<Chat> messages = chatService.getMessagesByUserId(userId);
        return ResponseEntity.ok(messages);
    }

    // 메제시 읽음 확인하기 
    @PutMapping("/{chatId}/readStatus")
    public ResponseEntity<Chat> updateReadStatus(@PathVariable Long chatId, @RequestParam Boolean readStatus) {
        Optional<Chat> updatedChat = chatService.updateReadStatus(chatId, readStatus);
        return updatedChat.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }

        // 메세지 삭제하기
        @PatchMapping("/{chatId}/soft-delete")
        public ResponseEntity<Void> softDeleteMessage(@PathVariable Long chatId) {
            chatService.softDeleteMessage(chatId);
            return ResponseEntity.noContent().build();
        }
}
