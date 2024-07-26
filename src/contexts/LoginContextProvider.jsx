import React, { createContext, useEffect, useState } from 'react';
import api from '../apis/api';
import Cookies from 'js-cookie';
import * as auth from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import * as Swal from '../apis/alert';

export const LoginContext = createContext();
LoginContext.displayName = 'LoginContextName'

const LoginContextProvider = ({ children }) => {
    // 상태
    const [isLogin, setLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [roles, setRoles] = useState({ isUser: false, isAdmin: false });
    const [remberUserId, setRemberUserId] = useState();

    // 페이지 이동
    const navigate = useNavigate();

    // 로그인 체크
    const loginCheck = async () => {
        const accessToken = Cookies.get("accessToken");
        console.log(`accessToken : ${accessToken}`);

        if (!accessToken) {
            console.log(`쿠키에 accessToken(jwt) 이 없음`);
            logoutSetting();
            return;
        }

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        let response;
        try {
            response = await auth.info();
        } catch (error) {
            console.log(`error : ${error}`);
            if (response) {
                console.log(`status : ${response.status}`);
            }
            return;
        }

        const data = response.data;
        console.log(`data : ${data}`);

        if (data === 'UNAUTHRIZED' || response.status === 401) {
            console.error(`accessToken (jwt) 이 만료되었거나 인증에 실패하였습니다.`);
            return;
        }

        console.log(`accessToken (jwt) 로 사용자 인증정보 요청 성공!`);
        loginSetting(data, accessToken);
    };

    // 로그인
    const login = async (username, password) => {
        console.log(`username : ${username}`);
        console.log(`password : ${password}`);

        try {
            const response = await auth.login(username, password);
            const data = response.data;
            const status = response.status;
            const headers = response.headers;
            const authorization = headers.authorization;
            const accessToken = authorization.replace("Bearer ", "");

            console.log(`data : ${data}`);
            console.log(`status : ${status}`);
            console.log(`headers : ${headers}`);
            console.log(`jwt : ${accessToken}`);

            if (status === 200) {
                Cookies.set("accessToken", accessToken);
                loginCheck();
                Swal.alert(`로그인 성공`, `메인 화면으로 갑니다.`, "success", () => { navigate("/") });
                navigate("/");
            }
        } catch (error) {
            Swal.alert("로그인 실패", "아이디 또는 비밀번호가 일치하지 않습니다.", "error");
        }
    };

    // 로그아웃
    const logout = (force = false) => {
        if (force) {
            logoutSetting();
            navigate("/");
            return;
        }

        Swal.confirm("로그아웃하시겠습니까?", "로그아웃을 진행합니다.", "warning",
            (result) => {
                if (result.isConfirmed) {
                    logoutSetting();
                    navigate("/");
                }
            }
        );
    };

    // 로그인 세팅
    const loginSetting = (userData, accessToken) => {
        const { no, userId, authList, name } = userData;
        const roleList = authList.map((auth) => auth.auth);

        console.log(`no : ${no}`);
        console.log(`userId : ${userId}`);
        console.log(`authList : ${authList}`);
        console.log(`roleList : ${roleList}`);
        console.log(`name : ${name}`);

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        setLogin(true);

        const updatedUserInfo = { no, userId, roleList, name };
        setUserInfo(updatedUserInfo);

        const updatedRoles = { isUser: false, isAdmin: false };
        roleList.forEach((role) => {
            if (role === 'ROLE_USER') updatedRoles.isUser = true;
            if (role === 'ROLE_ADMIN') updatedRoles.isAdmin = true;
        });
        setRoles(updatedRoles);
    };

    // 로그아웃 세팅
    const logoutSetting = () => {
        api.defaults.headers.common.Authorization = undefined;
        Cookies.remove("accessToken");
        setLogin(false);
        setUserInfo(null);
        setRoles({ isUser: false, isAdmin: false });
    };

    useEffect(() => {
        loginCheck();
    }, []);

    return (
        <LoginContext.Provider value={{ isLogin, userInfo, roles, login, loginCheck, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;
