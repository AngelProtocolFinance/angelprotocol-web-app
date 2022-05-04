import toCurrency from "helpers/toCurrency";
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
import { useGetFlipsideQueryQuery } from "services/flipside/overview";
import Figure from "../Governance/Figure";
import PriceFigure from "./PriceFigure";

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
  const { data: TVLData } = useGetFlipsideQueryQuery("tvl?type=Total");
  const { data: USTDonatedData } = useGetFlipsideQueryQuery("ust_donated");
  const { data: USTWithdrawnData } = useGetFlipsideQueryQuery("ust_withdrawn");
  const { data: HaloPriceData } = useGetFlipsideQueryQuery("halo_price");

  const [chart, setChart] = useState<any>([]);
  const [latestTVL, setLatestTVL] = useState<number>(0);
  const [totalUSTDonated, setTotalUSTDonated] = useState<number>(0);
  const [totalUSTWithdrawn, setTotalUSTWithdrawn] = useState<number>(0);
  const [totalNumDonations, setTotalNumDonations] = useState<number>(0);
  const [haloData, setHaloData] = useState<any>({
    price: 0,
    circulating_supply: 0,
    halo_staked: 0,
  });

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
    if (!USTWithdrawnData) return;
    setTotalUSTWithdrawn(
      USTWithdrawnData[USTWithdrawnData.length - 1].total_ust_withdrawn
    );
  }, [USTWithdrawnData]);

  useEffect(() => {
    if (!HaloPriceData) return;

    const latestHaloData = HaloPriceData[HaloPriceData.length - 1];
    setHaloData({
      price: latestHaloData.price_usd,
      circulating_supply: latestHaloData.circulating_supply,
      halo_staked: 0,
    });
  }, [HaloPriceData]);

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
              <XAxis
                interval={Math.floor(chart.length / 10)}
                dataKey="date"
                stroke="#d7e0e8"
                opacity={0.7}
                tickFormatter={(value) =>
                  new Date(value).toISOString().split("T")[0]
                }
              />
              <YAxis
                dataKey="value"
                stroke="#d7e0e8"
                opacity={0.7}
                tickFormatter={(value) => toCurrency(value, 0, true)}
              />
              <Tooltip cursor={false} />
              <Line
                dot={false}
                type="monotone"
                dataKey="value"
                stroke="#54A3D9"
                strokeWidth={3}
              />
              <Line
                dot={false}
                type="monotone"
                dataKey="total_ust_donated"
                stroke="#7ec682"
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
              {haloData.price.toFixed(3)} UST
            </h1>
          </div>
          <div className="h-72 w-full border border-white/10 shadow-xl">
            <ResponsiveContainer height="100%" width="100%">
              {HaloPriceData ? (
                <LineChart data={HaloPriceData}>
                  <XAxis dataKey="date" stroke="#d7e0e8" opacity={0.7} />
                  <YAxis dataKey="price_usd" stroke="#d7e0e8" opacity={0.7} />
                  <Tooltip cursor={false} />
                  <Line
                    dot={false}
                    type="monotone"
                    dataKey="price_usd"
                    stroke="#54A3D9"
                    strokeWidth={3}
                  />
                </LineChart>
              ) : (
                <></>
              )}
            </ResponsiveContainer>
          </div>
        </div>
        <div className="border border-white/10 shadow-xl rounded-md p-5 flex-col w-full h-96">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-3 w-full mb-10 h-fit">
            <PriceFigure
              title="Circulating Supply"
              value={haloData.circulating_supply}
            />
            <PriceFigure title="Amount Staked" value={haloData.halo_staked} />
          </div>
          <div className="h-60">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#3e769a" />
                <Bar dataKey="uv" fill="#7ec682" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
