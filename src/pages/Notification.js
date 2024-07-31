import React, { useContext } from "react";
import Contents from "../components/Notification/Contents";
import Sidebar from "../components/Notification/Sidebar";
import "../styles/Notification/notificationPage.css";
import { LoginContext } from "../contexts/LoginContextProvider"; // 로그인 상태를 가져오기 위해 컨텍스트 임포트

const Notifications = () => {
  const { isLogin } = useContext(LoginContext); // 로그인 상태 확인

  if (!isLogin) {
    return (
      <div className="login-prompt">
        <h2>"로그인이 필요한 서비스입니다."</h2>
        <p>This service requires login.</p>
        <button
          className="login-button"
          onClick={() => (window.location.href = "/login")}
        >
          로그인
        </button>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="notification-main">
        <Contents />
        <Sidebar />
      </div>
    </div>
  );
};

export default Notifications;
