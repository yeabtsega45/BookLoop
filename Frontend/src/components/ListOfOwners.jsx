function ListOfOwners() {
  return (
    <div className="bg-primary-contrast flex flex-col justify-center items-center w-full h-[91.1%] m-auto mt-5 rounded-2xl">
      <MaterialReactTable table={table} />
    </div>
  );
}

export default ListOfOwners;
