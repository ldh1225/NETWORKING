import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContextProvider";
import "../styles/Header.css";

const Header = () => {
  const { isLogin } = useContext(LoginContext);

  return (
    <header className="header">
      <div className="logo">
        NET<span>WORKING</span>
      </div>
      <nav>
        <NavLink exact to="/" activeClassName="active">
          홈
        </NavLink>
        <NavLink to="/joblist" activeClassName="active">
          채용 공고
        </NavLink>
        <NavLink to="/chat" activeClassName="active">
          메시지
        </NavLink>
        <NavLink to="/notifications" activeClassName="active">
          알림
        </NavLink>
        <NavLink to="/login" activeClassName="active">
          {isLogin ? "로그아웃" : "로그인"}
        </NavLink>
        {!isLogin && (
          <NavLink to="/join" activeClassName="active">
            회원가입
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
