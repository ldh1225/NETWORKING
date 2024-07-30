import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import profileImage from "../../assets/icons/profileicon.png";
import { LoginContext } from "../../contexts/LoginContextProvider";
import "../../styles/Job/Profile.css";

const Profile = () => {
  const { isLogin, userInfo, loginCheck } = useContext(LoginContext);

  useEffect(() => {
    const checkLoginStatus = async () => {
      await loginCheck(); // 로그인 상태를 비동기적으로 확인
    };
    checkLoginStatus(); // 컴포넌트가 마운트될 때 로그인 상태를 확인
  }, []); // 빈 배열을 의존성 배열로 설정하여 한 번만 실행되도록 합니다.

  if (!isLogin) {
    return (
      <div className="profile">
        <div className="profile-img">
          <Link to="/login">
            <img src={profileImage} alt="Profile" />
          </Link>
        </div>
        <div className="profile-login">
          <Link to="/login">로그인 해주세요</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-img">
        <Link to="/User">
          <img src={userInfo?.profileImage || profileImage} alt="Profile" />
        </Link>
      </div>
      <div className="profile-name">{userInfo?.name || "사용자 이름"}</div>
      <div className="profile-status">{userInfo?.jobTitle || "프론트엔드개발자"}</div>
      <div className="profile-info">
        <span>
          <i className="fas fa-user-friends"></i> 팔로워 {userInfo?.followers || 0}
        </span>
        <span className="icon">+</span>
      </div>
      <div className="profile-info">
        <Link to="/User">
          <span>
            <i className="fas fa-edit"></i> 프로필 수정하기
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;