import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import PriceFigure from "./PriceFigure";

interface CircStakeData {
  circ: number;
  staked: number;
  stakedChart: any[];
}

export default function CircStakeData({
  circ,
  staked,
  stakedChart,
}: CircStakeData) {
  return (
    <div className="border border-white/10 shadow-xl rounded-md p-5 flex-col w-full h-fit">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-3 w-full mb-10 h-fit">
        <PriceFigure title="Circulating Supply" value={circ} />
        <PriceFigure title="Amount Staked" value={staked} />
      </div>
      <div className="h-48 md:h-60">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart data={stakedChart}>
            <XAxis dataKey="date" interval={100} />
            <Tooltip
              labelFormatter={(value) =>
                new Date(value).toISOString().split("T")[0]
              }
            />
            <Legend />
            <Bar
              dataKey="circulating_supply"
              fill="#3e769a"
              name="Circulating Supply"
            />
            <Bar
              dataKey="cum_total_staked"
              fill="#7ec682"
              name="Total Staked"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
