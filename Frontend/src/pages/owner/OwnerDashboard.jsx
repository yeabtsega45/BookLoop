import Header from "@/components/Header";
import Statistics from "@/components/Statistics";
import BookStatus from "@/components/BookStatus";
import EarningSummary from "@/components/EarningSummary";

function OwnerDashboard() {
  return (
    <div className="flex flex-col justify-between items-center w-full h-full m-auto pt-4">
      <Header role="Owner" page="Dashboard" />
      <div className="flex justify-center items-center w-full h-[91.1%] m-auto mt-5">
        <Statistics />
        <div className="flex flex-col justify-center items-center w-[70.5%] h-[94.9%] m-auto">
          <BookStatus />
          <EarningSummary />
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
