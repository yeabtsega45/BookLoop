import Header from "@/components/Header";
import Statistics from "@/components/Statistics";
import BookStatusAdmin from "@/components/BookStatusAdmin";
import EarningSummary from "@/components/EarningSummary";

function AdminDashboard() {
  return (
    <div className="flex flex-col justify-between items-center w-full h-full m-auto pt-4 mb-7">
      <Header role="Admin" page="Dashboard" />
      <div className="flex justify-center w-[1146px] h-[91.1%] gap-5 mt-5">
        <Statistics />
        <div className="flex flex-col justify-center items-center max-w-[850px] w-full h-[94.9%] gap-5 ">
          <BookStatusAdmin />
          <EarningSummary />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
