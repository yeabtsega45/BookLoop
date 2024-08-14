import Header from "@/components/Header";
import ListOfBooks from "@/components/ListOfBooks";

function AdminBooks() {
  return (
    <div className="flex flex-col justify-between items-center w-full h-full m-auto pt-4 ">
      <Header role="Admin" page="Books" />
      <ListOfBooks />
    </div>
  );
}

export default AdminBooks;
