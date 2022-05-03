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
  const { data: TVLData } = useGetTVLQuery("tvl?type=Total");
  const { data: USTDonatedData } = useGetTVLQuery("ust_donated");
  const { data: USTWithdrawnData } = useGetTVLQuery("ust_withdrawn");
  const { data: HaloPriceData } = useGetTVLQuery("halo_price");

  const [chart, setChart] = useState<any>([]);
  const [latestTVL, setLatestTVL] = useState<number>(0);
  const [totalUSTDonated, setTotalUSTDonated] = useState<number>(0);
  const [totalUSTWithdrawn, setTotalUSTWithdrawn] = useState<number>(0);
  const [totalNumDonations, setTotalNumDonations] = useState<number>(0);

  useEffect(() => {
    if (!TVLData || !USTDonatedData) return;
    const chart = TVLData.map((t: any) => ({
      ...t,
      ...USTDonatedData.find((ust: any) => ust.date === t.date),
    }));

    setLatestTVL(TVLData[TVLData.length - 1].value);
    setTotalNumDonations(
      USTDonatedData[USTDonatedData.length - 1].total_number_of_donations
    );
    setTotalUSTDonated(
      USTDonatedData[USTDonatedData.length - 1].total_ust_donated
    );
    setChart(chart);
  }, [TVLData, USTDonatedData]);

  useEffect(() => {
    setTotalUSTWithdrawn(
      USTWithdrawnData[USTWithdrawnData.length - 1].total_ust_withdrawn
    );
  }, [USTWithdrawnData]);

  return (
    <div className="padded-container grid grid-rows-aa1 gap-4 pb-4 min-h-screen">
      <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
        Endowments
      </h2>
      <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        <Figure title="Total UST Donated" denom="UST" value={totalUSTDonated} />
        <Figure title="Total Value Locked" denom="UST" value={latestTVL} />
        <Figure
          title="Total UST Withdrawn"
          denom="UST"
          value={totalUSTWithdrawn}
        />
        <Figure
          title="Number of Donations"
          denom=""
          value={totalNumDonations}
        />
      </div>
      <div className="shadow-xl border-4 border-white/10 w-full rounded-md pt-10 pb-5 px-10 max-h-[550px]">
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
        Token
      </h2>
      <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-2 gap-3 h-fit">
        <div className="h-96">
          <div className="flex flex-row items-center justify-between px-5 w-full h-16 border border-white/10 shadow-xl rounded-md mb-3">
            <h1 className="text-xl font-bold uppercase text-white-grey/80">
              Halo Price:{" "}
            </h1>
            <h1 className="text-xl font-bold uppercase text-white-grey/80">
              {0.05} UST
            </h1>
          </div>
          <div className="h-72 w-full border border-white/10 shadow-xl">
            <ResponsiveContainer height="100%" width="100%">
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
            </ResponsiveContainer>
          </div>
        </div>
        <div className="border border-white/10 shadow-xl rounded-md p-5 flex-col w-full h-96">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-3 w-full mb-10 h-fit">
            <HaloFigure title="Circulating Supply" value={0.05} />
            <HaloFigure title="# of HALO Staked" value={0.05} />
          </div>
          <div className="h-60">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={data}>
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
