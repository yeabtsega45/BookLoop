import Sidebar from "@/components/SideBar";
import Header from "@/components/Header";
import Statistics from "@/components/Statistics";
// import BookStatus from "@/components/BookStatus";
import EarningSummary from "@/components/EarningSummary";

function OwnerDashboard() {
  return (
    <div className="w-full h-full flex justify-center items-center m-auto bg-primary-background">
      <Sidebar />
      <div className="flex flex-col justify-between items-center w-[77.8%] h-[95.8%] m-auto">
        <Header />
        <div className="flex justify-center items-center w-full h-[91.1%] m-auto">
          <Statistics />
          <div className="flex flex-col justify-center items-center w-[70.5%] h-[94.9%] m-auto">
            {/* <BookStatus /> */}
            <EarningSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
