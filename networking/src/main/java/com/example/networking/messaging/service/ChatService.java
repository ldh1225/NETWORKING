package com.example.networking.messaging.service;

import com.example.networking.messaging.entity.Chat;
import com.example.networking.messaging.model.ChatMessage;
import com.example.networking.messaging.repository.ChatRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    private static final Logger logger = LoggerFactory.getLogger(ChatService.class);

    @Autowired
    private ChatRepository chatRepository;

    // 새로운 메세지 저장하기
    @Transactional
    public Chat saveMessage(ChatMessage chatMessage) {

        if (chatMessage.getMessage() == null || chatMessage.getMessage().isEmpty()) {
            logger.error("null 혹은 빈 메세지는 저장할 수 없습니다.: {}", chatMessage);
            throw new IllegalArgumentException("메세지 내용은 null 혹은 빈 메세지일 수 없습니다.");
        }

        if (chatMessage.getSender() == null || chatMessage.getSender().isEmpty()) {
            logger.error("null 혹은 빈 닉네임은 저장할 수 없습니다.: {}", chatMessage);
            throw new IllegalArgumentException("닉네임은 null 혹은 빈 값일 수 없습니다.");
        }

        Chat chat = new Chat();
        chat.setChatId(chatMessage.getChatId());
        chat.setChatRoomId(chatMessage.getChatRoomId());
        chat.setUserId(chatMessage.getUserId());
        chat.setMessage(chatMessage.getMessage());
        chat.setNickname(chatMessage.getSender());
        chat.setReadStatus(false); 
        chat.setIsDeleted(false); 
        chat.setType(chatMessage.getType());

        logger.info("메세지 저장중: {}", chat);

        Chat savedChat = chatRepository.save(chat);
        logger.info("메세지가 저장되었습니다: {}", savedChat);

        return savedChat;
    }

    // 채팅방 id로 채팅메세지 찾기
    public List<Chat> getMessagesByChatRoomId(Long chatRoomId) {
        return chatRepository.findActiveChatsByChatRoomId(chatRoomId);
    }

    // 유저 id로 채팅메세지 찾기
    public List<Chat> getMessagesByUserId(Integer userId) {
        return chatRepository.findByUserId(userId);
    }

    // 메제시 읽음 확인하기 
    @Transactional
    public Optional<Chat> updateReadStatus(Long chatId, Boolean readStatus) {
        Optional<Chat> message = chatRepository.findById(chatId);
        if (message.isPresent()) {
            Chat chat = message.get();
            chat.setReadStatus(readStatus);
            chatRepository.save(chat);
        }
        return message;
    }

    // 메세지 삭제
    @Transactional
    public void softDeleteMessage(Long chatId) {
        Optional<Chat> message = chatRepository.findById(chatId);
        if (message.isPresent()) {
            Chat chat = message.get();
            chat.setIsDeleted(true);
            chatRepository.save(chat);
        }
    }
}
