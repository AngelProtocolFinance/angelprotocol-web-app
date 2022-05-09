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

interface CircStake {
  date: string;
  circulating_supply: number;
  cum_total_staked: number;
  pct_staked: number;
}

export default function HaloBoard() {
  const { data: HaloPriceData } = useGetFlipsideQueryQuery("halo_price");
  const { data: StakedInfo } = useGetFlipsideQueryQuery("halo_stake");

  const [price, setPrice] = useState<number>(0);
  const [circ, setCirc] = useState<number>(0);
  const [staked, setStaked] = useState<number>(0);
  const [stakedChart, setStakedChart] = useState<CircStake[]>([]);

  useEffect(() => {
    if (!HaloPriceData) return;

    const latestHaloData = HaloPriceData[HaloPriceData.length - 1];

    setPrice(latestHaloData.price_usd);
    setCirc(latestHaloData.circulating_supply);
  }, [HaloPriceData]);

  useEffect(() => {
    if (!StakedInfo) return;
    const barCount = 6;
    const steps = Math.floor(StakedInfo.length / barCount);
    const stop = StakedInfo[StakedInfo.length - 1];
    const latestStakeData = [];

    for (let i = 0; i < barCount - 1; i++) {
      latestStakeData.push(StakedInfo[i * steps]);
    }

    latestStakeData.push(stop);

    setStaked(stop.cum_total_staked);
    setStakedChart(latestStakeData);
  }, [StakedInfo]);

  return (
    <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-2 gap-3 h-fit">
      <div className="h-fit w-full">
        <div className="flex flex-row items-center justify-between px-5 w-full h-16 border border-white/10 shadow-xl rounded-md mb-3">
          <h1 className="text-xl font-bold uppercase text-white-grey/80">
            Halo Price:{" "}
          </h1>
          <h1 className="text-xl font-bold uppercase text-white-grey/80">
            {price.toFixed(3)} UST
          </h1>
        </div>
        <div className="h-[315px] w-full border border-white/10 shadow-xl pb-5 pt-10 pl-0 pr-5">
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
    </div>
  );
}
