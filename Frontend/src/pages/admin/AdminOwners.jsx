import Header from "@/components/Header";
import ListOfOwners from "@/components/ListOfOwners";

function AdminOwners() {
  return (
    <div className="flex flex-col justify-between items-center w-[77.8%] h-[95.8%] m-auto pt-4">
      <Header role="Admin" page="Owners" />
      <ListOfOwners />
    </div>
  );
}

export default AdminOwners;
