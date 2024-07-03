-- Active: 1718322098745@@127.0.0.1@3306@fullstackdb
-- 기존 테이블 존재하면 삭제
DROP TABLE IF EXISTS user;
-- user : 회원 테이블
CREATE TABLE user (
    "NO" int NOT NULL AUTO_INCREMENT,
    ''USER_ID'' VARCHAR(100) NOT NULL,
    ''USER_PW'' VARCHAR(200) NOT NULL,
    ''NAME'' VARCHAR(100) NOT NULL,
    ''EMAIL'' VARCHAR(200) DEFAULT NOT NULL,
    ''REG_DATE'' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ''UPD_DATE'' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ''ENABLED'' int DEFAULT 1,
    PRIMARY KEY ('NO')
) COMMENT='회원';

-- BCryptPasswordEncoder - 암호화 시
-- 사용자
INSERT INTO user ( user_id, user_pw, name, email )
VALUES ( 'user', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '사용자', 'user@mail.com' );

-- 관리자
INSERT INTO user ( user_id, user_pw, name, email )
VALUES ( 'admin', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '관리자', 'user@mail.com' );
