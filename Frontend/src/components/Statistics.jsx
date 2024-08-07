function Statistics() {
  return (
    <div className="w-[27.7%] h-full m-auto bg-primary-contrast px-4">
      <div className="pt-8 pb-9">
        <h3 className="text-xl font-medium text-[#525256]">
          This Month Statistics
        </h3>
        <p className="text-sm text-text-contrast">
          Tue, 14 Nov, 2024, 11.30 AM{" "}
        </p>
      </div>
      <div className="flex flex-col pb-9 px-6">
        <div className="flex justify-between items-center text-[#656575]">
          <p className="text-lg">Income</p>
          <p className="bg-[#F4F5F7] text-xs p-1 rounded-sm mb-3">This Month</p>
        </div>
        <hr className="mb-3" />
        <div className="flex mb-2">
          <h1 className="text-3xl font-bold">ETB 9460.00</h1>
          <p className="text-[#FF2727] font-medium pl-4">↓ 1.5%</p>
        </div>
        <p className="text-[#656575] text-sm mb-1">
          Compared to ETB9940 last month
        </p>
        <div className="flex justify-between items-center text-[#525256] text-sm">
          <p>Last Month Income</p>
          <p>ETB 25658.00</p>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
