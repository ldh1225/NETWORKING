package com.example.networking.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.networking.service.UserService;

/**
 *      회원 정보
 *      [GET]       /users/info     - 회원정보 조회     (ROLE_USER)
 *      [POST]      /users          - 회원가입          ALL
 *      [PUT]       /users          - 회원정보 수정     (ROLE_USER)
 *      [DELETE]    /users          - 회원탈퇴          (ROLE_ADMIN)
 */
@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserService userService;

    /**
     * 사용자 정보 조회
     * @param customUser
     * @return
     */
    @Secured("ROLE_USER") // USER 권한 설정
    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomUser customUser) {

        log.info("::::: customUser :::::");
        log.info("customUser : " + customUser);

        Users user = customUser.getUser();
        log.info("user : " + user);

        // 인증된 사용자 정보
        if( user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);

        // 인증되지 않음
        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }

    /**
     * 회원가입
     * @param entity
     * @return
     * @throws Exception
     */
    @PostMapping("")
    public ResponseEntity<?> join(@ResponseBody Users user) throws Exception {
        log.info("[POST] - /users");
        int result = userService.insert(user);

        if ( result > 0 ) {
            log.info("회원가입 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else {
            log.info("회원가입 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 회원 정보 수정
     * @param entity
     * @return
     * @throws Exception
     */
    @Secured("ROLE_USER") // USER 권한 설정
    @PutMapping("")
    public ResponseEntity<?> update(@ResponseBody Users user) throws Exception {
        log.info("[PUT] - /users");
        int result = userService.update(user);

        if ( result > 0 ) {
            log.info("회원수정 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else {
            log.info("회원수정 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 회원 탈퇴
     * @param userId
     * @return
     * @throws Exception
     */
    @Secured("ROLE_ADMIN")  // ADMIN 권한 설정
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> destroy(@PathVariable("userId") String userId) throws Exception {
        log.info("[DELETE] - /users/{userId}");

        int result = userService.delete(userId);

        if ( result > 0 ) {
            log.info("회원삭제 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else {
            log.info("회원삭제 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }
}