// App.js
import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Social from "./pages/Social";
import Chat from "./pages/Chat";
import Joblist from "./pages/Joblist";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Notifications from "./pages/Notification";
import { LoginContext } from "./contexts/LoginContextProvider";

function App() {
  const { isLogin } = useContext(LoginContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={isLogin ? <Social /> : <HomePage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/joblist" element={<Joblist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<Navigate to={isLogin ? "/" : "/login"} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
