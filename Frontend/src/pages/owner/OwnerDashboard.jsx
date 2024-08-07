import Sidebar from "@/components/SideBar";
import Header from "@/components/Header";
import Statistics from "@/components/Statistics";

function OwnerDashboard() {
  return (
    <div className="w-full h-full flex m-auto bg-primary-background">
      <Sidebar />
      <div className="flex flex-col w-[77.8%] h-full m-auto">
        <Header />
        <div className="w-full m-auto">
          <Statistics />
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
