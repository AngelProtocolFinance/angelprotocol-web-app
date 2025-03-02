import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { LoaderData } from "./api";
import Pagination from "./paginator";
export { loader } from "./api";

const _usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Page() {
  const data = useLoaderData<LoaderData>();
  const [, setParams] = useSearchParams();

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
            <th className="text-left p-2 border border-gray-l3">City</th>
            <th className="text-left p-2 border border-gray-l3">State</th>
            <th className="text-left p-2 border border-gray-l3">State</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((d) => (
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
              <td className="border border-gray-l3 p-2">{d.city}</td>
              <td className="border border-gray-l3 p-2">{d.state}</td>
              <td className="border border-gray-l3 p-2">{d.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        onPageChange={(page: number) =>
          setParams((p) => {
            p.set("page", page.toString());
            return p;
          })
        }
        size={data.size}
        num_items={data.num_items}
        page={data.page}
      />
    </div>
  );
}
