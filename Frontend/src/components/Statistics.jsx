import { PieChart } from "@mui/x-charts/PieChart";

const chartData = [
  { label: "Fiction", value: 54 },
  { label: "Self Help", value: 20 },
  { label: "Business", value: 26 },
];

const palette = ["blue", "green", "red"];

function Statistics() {
  return (
    <div className="w-[27.7%] h-full m-auto bg-primary-contrast px-4 pb-24">
      <div className="pt-8 pb-9">
        <h3 className="text-xl font-medium text-[#525256]">
          This Month Statistics
        </h3>
        <p className="text-sm text-text-contrast">
          Tue, 14 Nov, 2024, 11.30 AM{" "}
        </p>
      </div>
      <div className="flex flex-col pb-9 px-6 rounded shadow-2xl">
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
        <div className="flex justify-between text-[#525256] text-sm">
          <p>Last Month Income</p>
          <p>ETB 25658.00</p>
        </div>
      </div>
      <div className="flex flex-col rounded shadow-2xl mt-9 px-4">
        <div className="flex justify-between text-[#656575] mt-6 px-6 mb-7">
          <p className="text-lg">Available Books</p>
          <p className="bg-[#F4F5F7] text-xs p-1 rounded-sm mb-3">Today</p>
        </div>
        <div className="flex flex-col items-center mb-6">
          <PieChart
            series={[
              {
                innerRadius: 60,
                outerRadius: 80,
                data: chartData,
              },
            ]}
            width={400}
            height={250}
            colors={palette}
            slotProps={{
              legend: { hidden: true },
            }}
            margin={{ right: 5 }}
          />
          <div className="w-full flex px-6">
            <ul className="list-none p-0">
              {chartData.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center w-full mb-1"
                >
                  <div className="flex items-center pr-20">
                    <span
                      className="w-4 h-4 mr-2 rounded-full"
                      style={{ backgroundColor: palette[index] }}
                    ></span>
                    <p className="text-[#1A1919]">{item.label}</p>
                  </div>
                  <p className="text-[#1A1919]">{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
