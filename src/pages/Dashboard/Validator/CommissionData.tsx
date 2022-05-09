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

export default function CommissionData() {
  const { data: commissionsData } = useGetFlipsideQuery(
    "validator_commissions"
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between px-5 w-full h-16 border border-white/10 shadow-xl rounded-md mb-3">
        <h1 className="text-xl font-bold uppercase text-white-grey/80">
          Total Commission:{" "}
        </h1>
        <h1 className="text-xl font-bold uppercase text-white-grey/80">
          {toCurrency(
            commissionsData
              ? commissionsData[commissionsData.length - 1].total_amount_usd
              : 0,
            2,
            true
          )}{" "}
          UST
        </h1>
      </div>
      <div className="h-[315px] w-full border border-white/10 shadow-xl pb-5 pt-10 pl-0 pr-5">
        <ResponsiveContainer height="100%" width="100%">
          {commissionsData ? (
            <LineChart data={commissionsData}>
              <XAxis
                dataKey="date"
                stroke="#d7e0e8"
                opacity={0.7}
                tickFormatter={(value) =>
                  new Date(value).toISOString().split("T")[0]
                }
              />
              <YAxis
                dataKey="total_amount_usd"
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
                dataKey="total_amount_usd"
                name="Total Commission"
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
