import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";

const uData = [4000, 3000, 2000, 2780, 1890, 2390];
const pData = [2400, 1398, 9800, 3908, 4800, 3800];
const xLabels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const yLabels = ["0.0 Birr", "100 Birr", "200 Birr", "300 Birr"];

function EarningSummary() {
  return (
    <div className="bg-primary-contrast w-full h-[38.9%] m-auto flex flex-col justify-center items-center">
      <p>Earning Summary</p>
      <ChartContainer
        width={500}
        height={300}
        series={[
          { data: pData, type: "line" },
          { data: uData, type: "line" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ data: yLabels }]}
      >
        <LinePlot />
        <MarkPlot />
        <ChartsReferenceLine x="Page C" lineStyle={{ stroke: "red" }} />
        <ChartsXAxis />
        <ChartsYAxis />
      </ChartContainer>
    </div>
  );
}

export default EarningSummary;
