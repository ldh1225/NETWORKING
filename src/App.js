import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Chat from "./pages/Chat";
import Joblist from "./pages/Joblist";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Notifications from "./pages/Notification";
import Social from "./pages/Social";
import User from './pages/User'; //마이페이지

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Social />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/joblist" element={<Joblist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/user" component={User} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;