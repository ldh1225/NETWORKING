import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Notifications from "./pages/Notifications";
import "./styles/notification/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
