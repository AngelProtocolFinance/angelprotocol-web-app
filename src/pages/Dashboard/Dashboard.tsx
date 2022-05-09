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
import EndowmentStats from "./EndowmentStats";
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
  const { data: USTDetailData } = useGetFlipsideQueryQuery("ust_details");
  const { data: HaloPriceData } = useGetFlipsideQueryQuery("halo_price");

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
    if (!USTDetailData) return;

    const latestData = USTDetailData[USTDetailData.length - 1];
    setLatestTVL(latestData.tvl);
    setTotalNumDonations(latestData.total_number_of_donations);
    setTotalUSTDonated(latestData.total_ust_donated);
    setTotalUSTWithdrawn(latestData.total_ust_withdrawn);
  }, [USTDetailData]);

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
      <nav className="flex flex-row gap-10">
        <h2 className="cursor-pointer font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
          Halo
        </h2>
        <h2 className="cursor-pointer font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
          Endowments
        </h2>
        <h2 className="cursor-pointer font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
          Liquidity
        </h2>
        <h2 className="cursor-pointer font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
          Validator
        </h2>
      </nav>
      <EndowmentStats
        latestTVL={latestTVL}
        totalNumDonations={totalNumDonations}
        totalUSTDonated={totalUSTDonated}
        totalUSTWithdrawn={totalUSTWithdrawn}
      />
      <div className="shadow-none md:shadow-xl border-0 md:border-4 md:border-white/10 w-full rounded-md p-0 md:pt-10 md:pb-5 md:px-10 max-h-[550px]">
        <div className="max-w-fit bg-white/10 shadow-xl mb-5 px-5 py-2 flex flex-col md:flex-row gap-2 md:gap-5 rounded-md">
          <div className="flex gap-2 items-center">
            <div className="w-5 h-5 rounded-full bg-blue-500" />
            <h1 className="text-l font-bold text-white-grey/80">
              Total Value Locked
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-5 h-5 rounded-full bg-green-400" />
            <h1 className="text-l font-bold text-white-grey/80">
              Total UST Donated
            </h1>
          </div>
        </div>
        <ResponsiveContainer
          maxHeight={400}
          height="100%"
          width="99%"
          aspect={3}
        >
          {!USTDetailData ? (
            <></>
          ) : (
            <LineChart data={USTDetailData}>
              <XAxis
                interval={Math.floor(USTDetailData.length / 10)}
                dataKey="date"
                stroke="#d7e0e8"
                opacity={0.7}
                tickFormatter={(value) =>
                  new Date(value).toISOString().split("T")[0]
                }
              />
              <YAxis
                dataKey="tvl"
                stroke="#d7e0e8"
                opacity={0.7}
                tickFormatter={(value) => toCurrency(value, 0, true)}
              />
              <Tooltip
                cursor={false}
                labelFormatter={(value) =>
                  new Date(value).toISOString().split("T")[0]
                }
              />
              <Line
                dot={false}
                type="monotone"
                dataKey="tvl"
                name="TVL"
                stroke="#54A3D9"
                strokeWidth={4}
              />
              <Line
                dot={false}
                type="monotone"
                dataKey="total_ust_donated"
                name="UST Donated"
                stroke="#7ec682"
                strokeWidth={4}
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
    </div>
  );
}
