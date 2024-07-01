import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Chat from "./pages/Chat";
import Joblist from "./pages/Joblist";
import Notifications from "./pages/Notification";
import Social from "./pages/Social";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Social />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/joblist" element={<Joblist />} />
          {/* <Route path="/member" element={<Member />} /> */}
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;