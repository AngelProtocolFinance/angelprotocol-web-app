import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useGetTVLQuery } from "services/flipside/overview";
import Figure from "../Governance/Figure";

export default function Dashboard() {
  const { data: TVLData } = useGetTVLQuery("tvl");
  const { data: USTDonatedData } = useGetTVLQuery("ust_donated");

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
        Overview
      </h2>
      <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        <Figure title="Total UST Donated" denom="UST" value={latestTVL} />
        <Figure title="Total Value Locked" denom="UST" value={latestTVL} />
        <Figure title="Total UST Withdrawn" denom="UST" value={latestTVL} />
        <Figure title="Number of Donations" denom="" value={150} />
      </div>
      <div className="border-4 border-white/10 w-full rounded-md pt-10 pb-5 px-10 max-h-min">
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
        HALO Token
      </h2>
      <div className="flex flex-wrap md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 mb-5">
        <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-2 border border-white/10 bg-white/10 shadow-xl text-angel-grey w-full rounded-md p-6">
          <div>
            <div>
              <h1>Total Supply: </h1>
              <h1>Total Supply: </h1>
            </div>
            <div>
              <h1>Total Supply: </h1>
              <h1>Total Supply: </h1>
            </div>
            <div>
              <h1>Total Supply: </h1>
              <h1>Total Supply: </h1>
            </div>
          </div>
          <div>Hello</div>
        </div>
        <div className="border border-white/10 bg-white/10 shadow-xl text-angel-grey w-full rounded-md p-6"></div>
      </div>
    </div>
  );
}
