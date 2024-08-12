import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "@/components/SideBar";
import Login from "@/pages/Login";
import OwnerDashboard from "@/pages/owner/OwnerDashboard";
import BookUpload from "@/pages/owner/BookUpload";
import Register from "@/pages/Register";
import AdminOwners from "./pages/admin/AdminOwners";

function App() {
  const location = useLocation();
  const showSidebar = !["/register", "/login"].includes(location.pathname);

  return (
    <>
      <div className="w-full h-full flex justify-between items-center m-auto bg-primary-background">
        {showSidebar && <SideBar />}
        <div
          className={`flex-1 justify-center items-center m-auto ${
            showSidebar ? "ml-[279px] h-[95.8%]" : "w-full h-full"
          }`}
        >
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<OwnerDashboard />} />
            <Route path="/bookupload" element={<BookUpload />} />
            <Route path="/admin/owners" element={<AdminOwners />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
