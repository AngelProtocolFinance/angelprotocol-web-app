import { useLoaderData } from "@remix-run/react";
import type { NonprofitItem } from "types/mongodb/nonprofits";
export { loader } from "./api";

const _usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Page() {
  const data = useLoaderData<NonprofitItem[]>();

  console.log(data);
  return (
    <div className="xl:mx-auto xl:container pt-16 font-heading text-sm">
      <table className="self-start border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 border border-gray-l3">Ein</th>
            <th className="text-left p-2 border border-gray-l3">Name</th>
            <th className="text-left p-2 border border-gray-l3">Assets</th>
            <th className="text-left p-2 border border-gray-l3">Income</th>
            <th className="text-left p-2 border border-gray-l3">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d._id}>
              <td className="border border-gray-l3 p-2">{d.ein}</td>
              <td className="border border-gray-l3 p-2">{d.name}</td>
              <td className="border border-gray-l3 p-2 text-sm">
                {d.assets && !Number.isNaN(d.assets)
                  ? _usd.format(d.assets)
                  : "-"}
              </td>
              <td className="border border-gray-l3 p-2 text-sm">
                {d.income && !Number.isNaN(d.income)
                  ? _usd.format(d.income)
                  : "-"}
              </td>
              <td className="border border-gray-l3 p-2 text-sm">
                {d.revenue && !Number.isNaN(d.revenue)
                  ? _usd.format(d.revenue)
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
