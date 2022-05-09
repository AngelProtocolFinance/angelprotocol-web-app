import toCurrency from "helpers/toCurrency";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetFlipsideQuery } from "services/flipside/overview";

export default function DonationsData() {
  const { data: donationsData } = useGetFlipsideQuery("validator_donations");
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between px-5 w-full h-16 border border-white/10 shadow-xl rounded-md mb-3">
        <h1 className="text-xl font-bold uppercase text-white-grey/80">
          Commission Donated:{" "}
        </h1>
        <h1 className="text-xl font-bold uppercase text-white-grey/80">
          {toCurrency(
            donationsData
              ? donationsData[donationsData.length - 1].total_ust_donated
              : 0,
            2,
            true
          )}{" "}
          UST
        </h1>
      </div>
      <div className="h-[315px] w-full border border-white/10 shadow-xl pb-5 pt-10 pl-0 pr-5">
        <ResponsiveContainer height="100%" width="100%">
          {donationsData ? (
            <LineChart data={donationsData}>
              <XAxis
                dataKey="date"
                stroke="#d7e0e8"
                opacity={0.7}
                tickFormatter={(value) =>
                  new Date(value).toISOString().split("T")[0]
                }
              />
              <YAxis
                dataKey="total_ust_donated"
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
                dataKey="total_ust_donated"
                name="Total UST Donated"
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
  );
}
