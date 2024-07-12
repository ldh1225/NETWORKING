import React, { createContext, useEffect, useState } from "react";
import api from "../apis/api";
import Cookies from "js-cookie";
import * as auth from "../apis/auth";
import { useNavigate } from "react-router-dom";
import * as Swal from "../apis/alert";

export const LoginContext = createContext();
LoginContext.displayName = "LoginContextName";

const LoginContextProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [roles, setRoles] = useState({ isUser: false, isAdmin: false });
  const navigate = useNavigate();

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
      return;
    }

    const data = response.data;
    console.log(`data : ${data}`);

    if (data === "UNAUTHORIZED" || response.status === 401) {
      console.error(`accessToken (jwt) 이 만료되었거나 인증에 실패하였습니다.`);
      return;
    }

    console.log(`accessToken (jwt) 로 사용자 인증정보 요청 성공!`);
    loginSetting(data, accessToken);
  };

  const login = async (username, password) => {
    console.log(`username : ${username}`);
    console.log(`password : ${password}`);

    try {
      const response = await auth.login(username, password);

      // 'Authorization' 헤더가 응답에 포함되어 있는지 확인
      const authHeader = response.headers["authorization"]; // 대소문자 주의
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const accessToken = authHeader.replace("Bearer ", "");

        console.log(`jwt : ${accessToken}`);
        if (response.status === 200) {
          // 쿠키에 accessToken 저장
          Cookies.set("accessToken", accessToken);
          localStorage.setItem("token", accessToken); // 로컬 스토리지에 저장

          // API 요청 헤더에 Authorization 추가
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

          // 로그인 체크
          await loginCheck();

          Swal.alert(`로그인 성공`, `메인 화면으로 갑니다.`, "success", () => {
            navigate("/");
          });
        }
      } else {
        throw new Error("Authorization header is missing in the response");
      }
    } catch (error) {
      Swal.alert(
        "로그인 실패",
        "아이디 또는 비밀번호가 일치하지 않습니다.",
        "error"
      );
    }
  };

  const logout = (force = false) => {
    if (force) {
      logoutSetting();
      navigate("/");
      return;
    }

    Swal.confirm(
      "로그아웃하시겠습니까?",
      "로그아웃을 진행합니다.",
      "warning",
      (result) => {
        if (result.isConfirmed) {
          logoutSetting();
          navigate("/");
        }
      }
    );
  };

  const loginSetting = (userData, accessToken) => {
    const { no, userId, authList } = userData;
    const roleList = authList.map((auth) => auth.auth);

    console.log(`no : ${no}`);
    console.log(`userId : ${userId}`);
    console.log(`authList : ${authList}`);
    console.log(`roleList : ${roleList}`);

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    setLogin(true);
    setUserInfo({ no, userId, roleList });

    const updatedRoles = { isUser: false, isAdmin: false };
    roleList.forEach((role) => {
      if (role === "ROLE_USER") updatedRoles.isUser = true;
      if (role === "ROLE_ADMIN") updatedRoles.isAdmin = true;
    });
    setRoles(updatedRoles);
  };

  const logoutSetting = () => {
    delete api.defaults.headers.common.Authorization;
    Cookies.remove("accessToken");
    localStorage.removeItem("token"); // 로컬 스토리지에서 제거
    setLogin(false);
    setUserInfo(null);
    setRoles({ isUser: false, isAdmin: false });
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <LoginContext.Provider
      value={{ isLogin, userInfo, roles, login, logout, loginCheck }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
