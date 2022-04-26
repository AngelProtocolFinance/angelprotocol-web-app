import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useGetTVLQuery } from "services/flipside/overview";
import Figure from "../Governance/Figure";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Dashboard() {
  const { data: TVLData } = useGetTVLQuery("endowmentsAPI");

  const totalValueLocked = TVLData?.filter((d: any) => d.type === "Total");

  return (
    <div className="padded-container grid grid-rows-aa1 gap-4 pb-4 min-h-screen">
      <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
        Overview
      </h2>
      <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-3 mb-5">
        <Figure title="Total Value Locked" denom="UST" value={10000} />
        <Figure title="Number of Endowments" denom="" value={3023} />
        <Figure
          title="Endowment Addresses"
          denom=""
          value={192}
          precision={0}
        />
      </div>
      <ResponsiveContainer height="100%" width="100%">
        {!totalValueLocked || totalValueLocked.length === 0 ? (
          <></>
        ) : (
          <LineChart height={300} data={totalValueLocked}>
            <XAxis dataKey="date" />
            {/* <YAxis /> */}
            {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5" /> */}
            {/* <Line
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            strokeWidth={3}
            className="shadow-xl"
          /> */}
            <Line
              dot={false}
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              strokeWidth={3}
              className="shadow-xl"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
      <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
        HALO Token
      </h2>
    </div>
  );
}
