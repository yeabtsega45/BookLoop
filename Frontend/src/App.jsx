import "./App.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "@/components/SideBar";
import Login from "@/pages/Login";
import OwnerDashboard from "@/pages/owner/OwnerDashboard";

function App() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <main className="flex-1 p-5">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<OwnerDashboard />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
