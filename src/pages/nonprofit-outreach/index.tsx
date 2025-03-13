import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { LoaderData } from "./api";
import { Header } from "./header";
import { Paginator } from "./paginator";
export { loader } from "./api";

const _usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Page() {
  const data = useLoaderData<LoaderData>();
  const [params, setParams] = useSearchParams();

  return (
    <div className="xl:mx-auto xl:container py-16 font-heading text-sm">
      <div className="w-full">
        <div className="overflow-x-auto relative">
          <table className="self-start border-collapse overflow-x-auto [&_th]:text-left [&_td]:align-top [&_td,&_th]:p-2 [&_td,&_th]:border [&_td,&_th]:border-gray-l3">
            <thead>
              <tr>
                <th>EIN</th>
                <th>Name</th>
                <th>Website</th>
                <th>
                  <Header
                    _key="asset_code"
                    name="Asset code"
                    filter={{
                      values: (k) => params.get(k)?.split(",") || [],
                      onChange(vs, k) {
                        setParams((p) => {
                          if (vs.length === 0) {
                            p.delete(k);
                            return p;
                          }
                          p.set(k, vs.join(","));
                          return p;
                        });
                      },
                    }}
                  />
                </th>
                <th>Assets</th>
                <th>
                  <Header
                    _key="income_code"
                    name="Income code"
                    filter={{
                      values: (k) => params.get(k)?.split(",") || [],
                      onChange(vs, k) {
                        setParams((p) => {
                          if (vs.length === 0) {
                            p.delete(k);
                            return p;
                          }
                          p.set(k, vs.join(","));
                          return p;
                        });
                      },
                    }}
                  />
                </th>
                <th>Income</th>
                <th>Revenue</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>NTEE code</th>
                <th>In care of</th>
                <th>Principal officer</th>
                <th>Group exemption number</th>
                <th>Subsection code</th>
                <th>Affiliation code</th>
                <th>Classification code</th>
                <th>Deductability code</th>
                <th>Foundation code</th>
                <th>Activity code</th> <th>Organization code</th>
                <th>Exempt organinzation status code</th>
                <th>Filing requirement code</th>
                <th>Sort Name</th>
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
                  <td>{d.city}</td>
                  <td>{d.state}</td>
                  <td>{d.mailing_address?.country}</td>

                  <td>{d.ntee_code}</td>
                  <td>{d.in_care_of_name?.replace("%", "")}</td>
                  <td>{d.principal_officer?.name}</td>
                  <td>{d.group_exemption_number}</td>
                  <td>{d.subsection_code}</td>
                  <td>{d.affilation_code}</td>
                  <td>{d.classification_code}</td>
                  <td>{d.deductibility_code}</td>
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
