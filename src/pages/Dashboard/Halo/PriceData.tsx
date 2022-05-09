import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PriceData {
  price: number;
  HaloPriceData: any[];
}

export default function PriceData({ price, HaloPriceData }: PriceData) {
  return (
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
  );
}
