import Sidebar from "@/components/SideBar";
import Header from "@/components/Header";

function OwnerDashboard() {
  return (
    <div className="w-full h-full flex m-auto">
      <Sidebar />
      <div className="flex flex-col w-full h-full m-auto">
        <Header />
      </div>
    </div>
  );
}

export default OwnerDashboard;
