import { Link, useSearchParams } from "@remix-run/react";
import type { LoaderData } from "./api";
import { ListFilter } from "./list-filter";
import { Paginator } from "./paginator";
import { RangeFilter } from "./range-filter";
export { loader } from "./api";
export { clientLoader } from "api/cache";
import { useCachedLoaderData } from "api/cache";
import { XIcon } from "lucide-react";
import { filter_factory } from "./common";
import type { ISort } from "./sort";
import { TextFilter } from "./text-filter";

const _usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Page() {
  console.log("render");
  const data = useCachedLoaderData<LoaderData>();
  const [params, setParams] = useSearchParams();
  const { sort, ...filters } = Object.fromEntries(params.entries());
  const sort_obj: ISort = {
    value: sort
      ? { key: sort.split("+")[0], direction: sort.split("+")[1] as any }
      : undefined,
    onChange: (v) => {
      setParams((p) => {
        p.set("sort", `${v.key}+${v.direction}`);
        return p;
      });
    },
  };
  const filter_props = filter_factory(params, setParams);

  const active_filters = Object.entries(filters).map(([k, v]) => (
    <div key={k} className="flex items-center gap-x-2">
      <button
        type="button"
        onClick={() =>
          setParams((p) => {
            p.delete(k);
            return p;
          })
        }
      >
        <XIcon size={14} className="text-red" />
      </button>
      <p>
        {k}: {v}
      </p>
    </div>
  ));

  return (
    <div className="xl:mx-auto xl:container py-16 font-heading text-sm">
      <div className="w-full">
        {active_filters.length > 0 && (
          <div>
            {active_filters.length > 1 && (
              <div className="flex items-center gap-x-2">
                <Link to=".">
                  <XIcon size={14} className="text-red" />
                </Link>
                <p>Active filters</p>
              </div>
            )}
            {active_filters}
          </div>
        )}
        <p className="font-bold my-2"> found: {data.num_items}</p>
        <div className="overflow-x-auto relative">
          <table className="self-start border-collapse overflow-x-auto [&_th]:text-left [&_th]:align-top [&_th]:text-balance [&_td]:text-nowrap [&_td,&_th]:p-2 [&_td,&_th]:border [&_td,&_th]:border-gray-l3">
            <thead>
              <tr>
                <th>EIN</th>
                <th>Name</th>
                <th>
                  Website
                  <ListFilter
                    {...filter_props("website_url")}
                    optsFn={async () => []}
                  />
                </th>
                <th>
                  Asset Code
                  <ListFilter {...filter_props("asset_code")} />
                </th>
                <th>
                  Assets
                  <RangeFilter {...filter_props("asset_amount")} />
                </th>
                <th>
                  Income code
                  <ListFilter {...filter_props("income_code")} />
                </th>
                <th>
                  Income
                  <RangeFilter {...filter_props("income_amount")} />
                </th>
                <th>
                  Revenue
                  <RangeFilter {...filter_props("revenue_amount")} />
                </th>
                <th>City</th>
                <th>
                  State
                  {!params.get("country") ||
                  /\b(USA|United\s+States)\b/i.test(
                    params.get("country") || ""
                  ) ? (
                    <ListFilter {...filter_props("state")} />
                  ) : null}
                </th>
                <th>
                  Country
                  <ListFilter {...filter_props("country")} />
                </th>
                <th>
                  NTEE Code
                  <TextFilter
                    num={1}
                    description="can query partial e.g. A (starts with A) or complete (A80)"
                    {...filter_props("ntee_code")}
                  />
                </th>
                <th>In care of</th>
                <th>Principal officer</th>
                <th>Group exemption number</th>
                <th>
                  Subsection code
                  <ListFilter {...filter_props("subsection_code")} />
                </th>
                <th>
                  Affiliation code
                  <ListFilter {...filter_props("affilation_code")} />
                </th>
                <th>
                  Classification code
                  <TextFilter
                    num={4}
                    description="NPOs may have up to 4 classification codes"
                    {...filter_props("classification_code")}
                  />
                </th>
                <th>
                  Deductibility code
                  <ListFilter {...filter_props("deductibility_code")} />
                </th>
                <th>
                  <ListFilter {...filter_props("deductibility_code_pub78")} />
                </th>
                <th>
                  Foundation code
                  <ListFilter {...filter_props("foundation_code")} />
                </th>
                <th>
                  Activity code
                  <TextFilter
                    num={3}
                    description="NPOs may have up to 3 activity codes"
                    {...filter_props("activity_code")}
                  />
                </th>
                <th>
                  Organization code
                  <ListFilter {...filter_props("organization_code")} />
                </th>
                <th>
                  <span>Exempt organization status code</span>
                  <ListFilter
                    {...filter_props("exempt_organization_status_code")}
                  />
                </th>
                <th>
                  Filing requirement code
                  <ListFilter {...filter_props("filing_requirement_code")} />
                </th>
                <th>
                  Sort name
                  <ListFilter
                    {...filter_props("sort_name")}
                    optsFn={async () => []}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((d, i) => (
                <tr key={d._id + i}>
                  <td>{d.ein}</td>
                  <td>{d.name}</td>
                  <td>{d.website_url}</td>
                  <td>{d.asset_code}</td>
                  <td>
                    {d.asset_amount && !Number.isNaN(d.asset_amount)
                      ? _usd.format(d.asset_amount)
                      : "-"}
                  </td>
                  <td>{d.income_code}</td>
                  <td>
                    {d.income_amount && !Number.isNaN(d.income_amount)
                      ? _usd.format(d.income_amount)
                      : "-"}
                  </td>
                  <td>
                    {d.revenue_amount && !Number.isNaN(d.revenue_amount)
                      ? _usd.format(d.revenue_amount)
                      : "-"}
                  </td>
                  <td>
                    {d.city?.toLowerCase() === d.country?.toLowerCase()
                      ? ""
                      : d.city}
                  </td>
                  <td>{d.state}</td>
                  <td>{d.country}</td>

                  <td>{d.ntee_code}</td>
                  <td>{d.in_care_of_name?.replace("%", "")}</td>
                  <td>{d.principal_officer?.name}</td>
                  <td>{d.group_exemption_number}</td>
                  <td>{d.subsection_code}</td>
                  <td>{d.affilation_code}</td>
                  <td>{d.classification_code}</td>
                  <td>{d.deductibility_code}</td>
                  <td>{d.deductibility_code_pub78?.join(", ")}</td>
                  <td>{d.foundation_code}</td>
                  <td>{d.activity_code}</td>
                  <td>{d.organization_code}</td>
                  <td>{d.exempt_organization_status_code}</td>
                  <td>{d.filing_requirement_code}</td>
                  <td>{d.sort_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Paginator
        className="mt-4"
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
