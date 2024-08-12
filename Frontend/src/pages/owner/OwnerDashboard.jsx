import Header from "@/components/Header";
import Statistics from "@/components/Statistics";
import BookStatus from "@/components/BookStatus";
import EarningSummary from "@/components/EarningSummary";

function OwnerDashboard() {
  return (
    <div className="flex flex-col justify-between items-center w-full h-full m-auto pt-4">
      <Header role="Owner" page="Dashboard" />
      <div className="flex   w-full h-[91.1%] gap-5 mt-5 ">
        <Statistics />
        <div className="flex flex-col justify-center items-center max-w-[850px] w-full h-[94.9%] gap-5 ">
          <BookStatus />
          <EarningSummary />
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
