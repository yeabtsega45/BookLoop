import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "@/components/SideBar";
import Login from "@/pages/Login";
import OwnerDashboard from "@/pages/owner/OwnerDashboard";
import BookUpload from "@/pages/owner/BookUpload";
import Register from "@/pages/Register";
import AdminOwners from "./pages/admin/AdminOwners";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  const canShowSidebar = !["/register", "/login"].includes(location.pathname);
  const [showSidebar, toggleSidebar] = useState(canShowSidebar);
  const theme = useTheme();

  return (
    <>
      <div className="relative w-full max-w-[100vw] h-full flex items-center m-auto bg-primary-background  gap-5">
        {canShowSidebar && (
          <div>
            {" "}
            {showSidebar ? (
              <SideBar toggleSidebar={() => toggleSidebar(!showSidebar)} />
            ) : (
              <div
                onClick={() => toggleSidebar(!showSidebar)}
                className="absolute top-8 left-2  self-start bg-blue-950 p-1 rounded-md"
              >
                <MenuIcon
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                />
              </div>
            )}
          </div>
        )}
        <div
          className={`flex-1 ${showSidebar ? " h-[95.8%] " : "w-full h-full"}`}
        >
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<OwnerDashboard />} />
            <Route path="/bookupload" element={<BookUpload />} />
            <Route path="/admin/owners" element={<AdminOwners />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
