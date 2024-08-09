import "./App.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "@/components/SideBar";
import Login from "@/pages/Login";
import OwnerDashboard from "@/pages/owner/OwnerDashboard";
import BookUpload from "@/pages/owner/BookUpload";

function App() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="w-full h-full flex-1 justify-center items-center m-auto bg-primary-background">
          <Routes>
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
