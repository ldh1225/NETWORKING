import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContextProvider';
import '../styles/Header.css';

const Header = () => {
    const { isLogin, logout } = useContext(LoginContext);
    
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
            </nav>
            <div className="util">
                {!isLogin ? (
                    <ul>
                        <li>
                            <NavLink to="/login">로그인</NavLink>
                            <NavLink to="/join">회원가입</NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <NavLink to="/user">마이페이지</NavLink>
                            <button className="link" onClick={logout}>로그아웃</button>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
}

export default Header;