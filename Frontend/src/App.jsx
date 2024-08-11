import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "@/components/SideBar";
import Login from "@/pages/Login";
import OwnerDashboard from "@/pages/owner/OwnerDashboard";
import BookUpload from "@/pages/owner/BookUpload";
import Register from "@/pages/Register";

function App() {
  const location = useLocation();
  const showSidebar = !["/register", "/login"].includes(location.pathname);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center m-auto bg-primary-background">
        {showSidebar && <SideBar />}
        <div className={`flex-1 ${showSidebar ? "" : "w-full"}`}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<OwnerDashboard />} />
            <Route path="/bookupload" element={<BookUpload />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
