import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  XAxis,
  BarChart,
  Bar,
  Legend,
  Tooltip,
} from "recharts";
import { useGetFlipsideQuery } from "services/flipside/overview";
import CircStakeData from "./CircStakeData";
import MCData from "./MCData";
import PriceData from "./PriceData";
import PriceFigure from "./PriceFigure";

interface CircStake {
  date: string;
  circulating_supply: number;
  cum_total_staked: number;
  pct_staked: number;
}

export default function HaloBoard() {
  const { data: HaloPriceData } = useGetFlipsideQuery("halo_price");
  const { data: StakedInfo } = useGetFlipsideQuery("halo_stake");

  const [marketCap, setMarketCap] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [circ, setCirc] = useState<number>(0);
  const [staked, setStaked] = useState<number>(0);
  const [stakedChart, setStakedChart] = useState<CircStake[]>([]);

  useEffect(() => {
    if (!HaloPriceData) return;

    const latestHaloData = HaloPriceData[HaloPriceData.length - 1];

    setMarketCap(latestHaloData.market_cap);
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
    <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-2 gap-5 h-fit">
      <MCData mc={marketCap} HaloPriceData={HaloPriceData} />
      <PriceData price={price} HaloPriceData={HaloPriceData} />
      <CircStakeData circ={circ} staked={staked} stakedChart={stakedChart} />
    </div>
  );
}
