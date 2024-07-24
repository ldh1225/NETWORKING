import React from "react";
import Contents from "../components/Notification/Contents";
import Sidebar from "../components/Notification/Sidebar";
import "../styles/notification/notification.css";

const Notifications = () => {
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
