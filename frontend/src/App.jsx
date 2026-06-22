import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Marketplace from "./pages/Marketplace";
import Showcase from "./pages/Showcase";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/showcase" element={<Showcase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;