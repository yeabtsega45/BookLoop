import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import OwnerDashboard from "@/pages/owner/OwnerDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<OwnerDashboard />} />
      </Routes>
    </>
  );
}

export default App;
