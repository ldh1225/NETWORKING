import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginContextProvider from "./contexts/LoginContextProvider";
import Chat from "./pages/Chat";
import Joblist from "./pages/Joblist";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Notifications from "./pages/Notification";
import Social from "./pages/Social";

function App() {
  return (
    <LoginContextProvider>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Social />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/joblist" element={<Joblist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
      <Footer />
    </div>
    </LoginContextProvider>
  );
}

export default App;