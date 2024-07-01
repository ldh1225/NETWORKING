import React from "react";
import Header from "./components/Header";
import Notifications from "./components/Notifications";
import Sidebar from "./components/Sidebar";
import "./styles/notification/App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Notifications />
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
