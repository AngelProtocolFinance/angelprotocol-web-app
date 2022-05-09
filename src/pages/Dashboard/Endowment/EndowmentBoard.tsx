import toCurrency from "helpers/toCurrency";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { useGetFlipsideQueryQuery } from "services/flipside/overview";
import EndowmentStats from "./EndowmentStats";

export default function EndowmentBoard() {
  const { data: USTDetailData } = useGetFlipsideQueryQuery("ust_details");

  const [latestTVL, setLatestTVL] = useState<number>(0);
  const [totalUSTDonated, setTotalUSTDonated] = useState<number>(0);
  const [totalUSTWithdrawn, setTotalUSTWithdrawn] = useState<number>(0);
  const [totalNumDonations, setTotalNumDonations] = useState<number>(0);

  useEffect(() => {
    if (!USTDetailData) return;

    const latestData = USTDetailData[USTDetailData.length - 1];
    setLatestTVL(latestData.tvl);
    setTotalNumDonations(latestData.total_number_of_donations);
    setTotalUSTDonated(latestData.total_ust_donated);
    setTotalUSTWithdrawn(latestData.total_ust_withdrawn);
  }, [USTDetailData]);

  return (
    <>
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
    </>
  );
}
