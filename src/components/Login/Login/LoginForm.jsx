import React, { useContext } from "react";
import { LoginContext } from "../../../contexts/LoginContextProvider";
import "./LoginForm.css";

const LoginForm = () => {
  const { login, userInfo } = useContext(LoginContext);

  const onLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;

    await login(username, password);
    const token = localStorage.getItem("token"); // 토큰 확인
    if (!token) {
      console.error("JWT 토큰이 로컬 스토리지에 저장되지 않았습니다.");
    }
  };

  return (
    <div className="form">
      <h2 className="login-title">Login</h2>

      {userInfo && (
        <div className="user-info">
          <p>Logged in as: {userInfo.userId}</p>
        </div>
      )}

      <form className="login-form" onSubmit={(e) => onLogin(e)}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            name="username"
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            name="password"
            autoComplete="password"
            required
          />
        </div>

        <button type="submit" className="btn btn--form btn-login">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
