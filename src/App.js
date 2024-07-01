import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Notification from "./pages/Notification";
import "./styles/notification/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/notification" element={<Notification />} />
          <Route path="/" element={<Notification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
