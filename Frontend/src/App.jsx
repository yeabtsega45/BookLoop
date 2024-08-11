import "./App.css";
import { Routes, Route } from "react-router-dom";
// import SideBar from "@/components/SideBar";
import Login from "@/pages/Login";
import OwnerDashboard from "@/pages/owner/OwnerDashboard";
import BookUpload from "@/pages/owner/BookUpload";
import Register from "@/pages/Register";

function App() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center m-auto bg-primary-background">
        {/* <SideBar /> */}
        <div className="flex-1">
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
