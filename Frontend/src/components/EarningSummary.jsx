import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import {
  lineElementClasses,
  LinePlot,
  markElementClasses,
} from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";

const line1 = [275, 155, 225, 155, 215, 165];
const line2 = [125, 179, 155, 190, 155, 230];
const xLabels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const yLabels = ["0.0 Birr", "100 Birr", "200 Birr", "300 Birr"];

function EarningSummary() {
  return (
    <div className="bg-primary-contrast w-full h-[38.9%] m-auto flex flex-col justify-center items-center rounded-2xl">
      <div className="flex justify-between w-full mx-auto px-8 mt-12">
        <div className="flex">
          <h3 className="font-semibold pr-8">Earning Summary</h3>
          <select className="text-[#656575] text-xs p-1 outline-none">
            <option>Mar 2022 - Oct 2024</option>
          </select>
        </div>
        <div className="flex">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-[#006AFF] rounded-full"></span>
            <span className="text-xs text-[#656575] pl-2">Last 6 months</span>
          </div>
          <div className="flex items-center pl-8">
            <span className="w-4 h-4 bg-[#656575] rounded-full"></span>
            <span className="text-xs text-[#656575] pl-2">
              Same period last year
            </span>
          </div>
        </div>
      </div>
      <ChartContainer
        width={800}
        height={300}
        series={[
          { data: line1, type: "line", color: "#006AFF" },
          {
            data: line2,
            type: "line",
            color: "#656575",
            id: "line2",
          },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ scaleType: "linear", data: yLabels, min: 0, max: 300 }]}
        sx={{
          [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
            strokeWidth: 1,
          },
          ".MuiLineElement-series-line2": {
            strokeDasharray: "5 5",
          },
          [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]:
            {
              fill: "#fff",
            },
          [`& .${markElementClasses.highlighted}`]: {
            stroke: "none",
          },
        }}
      >
        <LinePlot />

        {xLabels.map((label) => (
          <ChartsReferenceLine
            key={label}
            x={label}
            lineStyle={{ stroke: "#e0e0f5" }}
          />
        ))}
        <ChartsXAxis disableLine disableTicks />
        <ChartsYAxis
          disableLine
          disableTicks
          tickNumber={4}
          tickFormat={(value) => `${value} Birr`}
        />
      </ChartContainer>
    </div>
  );
}

export default EarningSummary;
