import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Marketplace from "./pages/Marketplace";
import Showcase from "./pages/Showcase";
import Dashboard from "./pages/Dashboard";
import AddFarmer from "./pages/AddFarmer";
import ProtectedRoute from "./components/ProtectedRoute";
import AIAssistant from "./pages/AIAssistant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/showcase" element={<Showcase />} />
        
        {/* Protected Dashboard & Farmer Management Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-farmer"
          element={
            <ProtectedRoute>
              <AddFarmer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-farmer/:id"
          element={
            <ProtectedRoute>
              <AddFarmer />
            </ProtectedRoute>
          }
        />
        <Route path="/ai" element={<AIAssistant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

