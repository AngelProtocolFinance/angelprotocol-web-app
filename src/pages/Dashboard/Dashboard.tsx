import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
  Tooltip,
} from "recharts";
import { useGetTVLQuery } from "services/flipside/overview";
import Figure from "../Governance/Figure";
import HaloFigure from "./HaloFigure";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

export default function Dashboard() {
  const { data: TVLData } = useGetTVLQuery("tvl");
  const { data: USTDonatedData } = useGetTVLQuery("ust_donated");
  const { data: HaloPriceData } = useGetTVLQuery("halo_price");

  const [chart, setChart] = useState<any>([]);
  const [latestTVL, setLatestTVL] = useState<number>(0);

  useEffect(() => {
    if (!TVLData || !USTDonatedData) return;
    const tvl = TVLData?.filter((d: any) => d.type === "Total");

    const chart = tvl.map((t: any) => ({
      ...t,
      ...USTDonatedData.find((ust: any) => ust.date === t.date),
    }));

    setLatestTVL(tvl[tvl.length - 1].value);
    setChart(chart);
  }, [TVLData, USTDonatedData]);

  return (
    <div className="padded-container grid grid-rows-aa1 gap-4 pb-4 min-h-screen">
      <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
        Endowments
      </h2>
      <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        <Figure title="Total UST Donated" denom="UST" value={latestTVL} />
        <Figure title="Total Value Locked" denom="UST" value={latestTVL} />
        <Figure title="Total UST Withdrawn" denom="UST" value={latestTVL} />
        <Figure title="Number of Donations" denom="" value={150} />
      </div>
      <div className="shadow-xl border-4 border-white/10 w-full rounded-md pt-10 pb-5 px-10 max-h-min">
        <div className="max-w-fit bg-white/10 shadow-xl mb-5">Hello</div>
        <ResponsiveContainer
          maxHeight={400}
          height="100%"
          width="99%"
          aspect={3}
        >
          {chart.length === 0 ? (
            <></>
          ) : (
            <LineChart data={chart}>
              <XAxis dataKey="date" stroke="#d7e0e8" opacity={0.7} />
              <YAxis dataKey="value" stroke="#d7e0e8" opacity={0.7} />
              <Tooltip cursor={false} />
              <Line
                dot={false}
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
                strokeWidth={3}
              />
              <Line
                dot={false}
                type="monotone"
                dataKey="total_ust_donated"
                stroke="orange"
                strokeWidth={3}
                className="shadow-xl"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
        HALO Metrics
      </h2>
      <div>
        <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-2 gap-10">
          <div className="flex flex-wrap">
            <div className="flex w-full">
              <h1>Price: </h1>
              <h1>{0.05} UST</h1>
            </div>
          </div>
          <div className="border border-white/10 shadow-xl rounded-md p-5 flex flex-wrap">
            <div className="grid grid-cols-2 gap-3 w-full">
              <HaloFigure title="Circulating Supply" value={0.05} />
              <HaloFigure title="# of HALO Staked" value={0.05} />
            </div>
            <ResponsiveContainer
              maxHeight={400}
              height="100%"
              width="99%"
              aspect={3}
            >
              <BarChart height={400} data={data}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
