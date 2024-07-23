// LoginContextProvider.js
import React, { createContext, useEffect, useState } from 'react';
import api from '../apis/api';
import Cookies from 'js-cookie';
import * as auth from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import * as Swal from '../apis/alert';

export const LoginContext = createContext();
LoginContext.displayName = 'LoginContextName'

const LoginContextProvider = ({ children }) => {
    const [isLogin, setLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [roles, setRoles] = useState({ isUser: false, isAdmin: false });
    const [rememberUserId, setRememberUserId] = useState();

    const navigate = useNavigate();

    const loginCheck = async () => {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
            logoutSetting();
            return;
        }

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        try {
            const response = await auth.info();
            const data = response.data;
            if (data === 'UNAUTHORIZED' || response.status === 401) {
                logoutSetting();
                return;
            }
            loginSetting(data, accessToken);
        } catch (error) {
            console.error("Error fetching user data:", error);
            logoutSetting();
        }
    }

    const login = async (username, password) => {
        try {
            const response = await auth.login(username, password);
            const data = response.data;
            const accessToken = response.headers.authorization.replace("Bearer ", "");
            if (response.status === 200) {
                Cookies.set("accessToken", accessToken);
                loginCheck();
                Swal.alert("로그인 성공", "메인 화면으로 갑니다.", "success", () => { navigate("/") });
                navigate("/");
            }
        } catch (error) {
            Swal.alert("로그인 실패", "아이디 또는 비밀번호가 일치하지 않습니다.", "error");
        }
    }

    const logout = (force = false) => {
        if (force) {
            logoutSetting();
            navigate("/");
            return;
        }

        Swal.confirm("로그아웃하시겠습니까?", "로그아웃을 진행합니다.", "warning", (result) => {
            if (result.isConfirmed) {
                logoutSetting();
                navigate("/");
            }
        });
    }

    const loginSetting = (userData, accessToken) => {
        const { no, userId, name, authList } = userData; // name 속성 추가
        const roleList = authList.map((auth) => auth.auth);

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        setLogin(true);
        setUserInfo({ no, userId, name, roleList }); // userInfo에 name 포함

        const updatedRoles = { isUser: false, isAdmin: false };
        roleList.forEach((role) => {
            if (role === 'ROLE_USER') updatedRoles.isUser = true;
            if (role === 'ROLE_ADMIN') updatedRoles.isAdmin = true;
        });
        setRoles(updatedRoles);
    }

    const logoutSetting = () => {
        api.defaults.headers.common.Authorization = undefined;
        Cookies.remove("accessToken");
        setLogin(false);
        setUserInfo(null);
        setRoles({ isUser: false, isAdmin: false });
    }

    useEffect(() => {
        loginCheck();
    }, []);

    return (
        <LoginContext.Provider value={{ isLogin, userInfo, roles, login, loginCheck, logout }}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginContextProvider;
