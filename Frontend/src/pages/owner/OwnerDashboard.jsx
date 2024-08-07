import Sidebar from "@/components/SideBar";
import Header from "@/components/Header";
import Statistics from "@/components/Statistics";
import BookStatus from "@/components/BookStatus";
import EarningSummary from "@/components/EarningSummary";

function OwnerDashboard() {
  return (
    <div className="w-full h-full flex m-auto bg-primary-background">
      <Sidebar />
      <div className="flex flex-col w-[77.8%] h-[96.4%] m-auto">
        <Header />
        <div className="flex w-full h-[91.1%] m-auto">
          <Statistics />
          <div className="flex flex-col w-[74%] h-[94.9%] m-auto">
            <BookStatus />
            <EarningSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
