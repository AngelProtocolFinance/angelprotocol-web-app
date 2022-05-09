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

export default function HaloBoard() {
  const { data: HaloPriceData } = useGetFlipsideQueryQuery("halo_price");
  const { data: StakedInfo } = useGetFlipsideQueryQuery("halo_stake");

  const [haloData, setHaloData] = useState<any>({
    price: 0,
    circulating_supply: 0,
    halo_staked: 0,
  });

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
    <>
      <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
        Token
      </h2>
      <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-2 gap-3 h-fit">
        <div className="h-96 w-full">
          <div className="flex flex-row items-center justify-between px-5 w-full h-16 border border-white/10 shadow-xl rounded-md mb-3">
            <h1 className="text-xl font-bold uppercase text-white-grey/80">
              Halo Price:{" "}
            </h1>
            <h1 className="text-xl font-bold uppercase text-white-grey/80">
              {haloData.price.toFixed(3)} UST
            </h1>
          </div>
          <div className="h-52 md:h-72 w-full border border-white/10 shadow-xl pb-5 pt-10 pl-0 pr-5">
            <ResponsiveContainer height="100%" width="100%">
              {HaloPriceData ? (
                <LineChart data={HaloPriceData}>
                  <XAxis
                    dataKey="date"
                    stroke="#d7e0e8"
                    opacity={0.7}
                    tickFormatter={(value) =>
                      new Date(value).toISOString().split("T")[0]
                    }
                  />
                  <YAxis dataKey="price_usd" stroke="#d7e0e8" opacity={0.7} />
                  <Tooltip
                    cursor={false}
                    labelFormatter={(value) =>
                      new Date(value).toISOString().split("T")[0]
                    }
                  />
                  <Line
                    dot={false}
                    type="monotone"
                    dataKey="price_usd"
                    name="Price"
                    stroke="#54A3D9"
                    strokeWidth={4}
                  />
                </LineChart>
              ) : (
                <></>
              )}
            </ResponsiveContainer>
          </div>
        </div>
        <div className="border border-white/10 shadow-xl rounded-md p-5 flex-col w-full h-fit">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-3 w-full mb-10 h-fit">
            <PriceFigure
              title="Circulating Supply"
              value={haloData.circulating_supply}
            />
            <PriceFigure title="Amount Staked" value={haloData.halo_staked} />
          </div>
          <div className="h-48 md:h-60">
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
    </>
  );
}
