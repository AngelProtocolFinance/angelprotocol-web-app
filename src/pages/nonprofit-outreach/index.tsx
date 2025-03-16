import { Link, useSearchParams } from "@remix-run/react";
import type { LoaderData } from "./api";
import { ListFilter } from "./list-filter";
import { Paginator } from "./paginator";
export { loader } from "./api";
export { clientLoader } from "api/cache";
import { useCachedLoaderData } from "api/cache";
import { XIcon } from "lucide-react";
import { TextFilter } from "./text-filter";

const _usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Page() {
  const data = useCachedLoaderData<LoaderData>();
  const [params, setParams] = useSearchParams();
  const active_filters = Array.from(params.entries()).map(([k, v]) => (
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
          <table className="self-start border-collapse overflow-x-auto [&_th]:text-left [&_th]:align-top [&_th]:text-balance [&_td]:align-top [&_td,&_th]:p-2 [&_td,&_th]:border [&_td,&_th]:border-gray-l3">
            <thead>
              <tr>
                <th>EIN</th>
                <th>Name</th>
                <th>
                  <ListFilter
                    _key="website_url"
                    name="Website"
                    filter={{
                      values: (k) => params.get(k)?.split(",") || [],
                      optsFn: async () => [],
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
                <th>
                  <ListFilter
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
                  <ListFilter
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
                <th>
                  <ListFilter
                    _key="state"
                    name="State"
                    filter={
                      // filter only available for US
                      !params.get("country") ||
                      /\b(USA|United\s+States)\b/i.test(
                        params.get("country") || ""
                      )
                        ? {
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
                          }
                        : undefined
                    }
                  />
                </th>
                <th>
                  <ListFilter
                    _key="country"
                    name="Country"
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
                <th>NTEE code</th>
                <th>In care of</th>
                <th>Principal officer</th>
                <th>Group exemption number</th>
                <th>
                  <ListFilter
                    _key="subsection_code"
                    name="Subsection code"
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
                <th>
                  <ListFilter
                    _key="affilation_code"
                    name="Affiliation code"
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
                <th>
                  <TextFilter
                    num={4}
                    label="Classification code"
                    _key="classification_code"
                    values={(k) => params.get(k)?.split(",") || []}
                    onChange={(vs, k) => {
                      setParams((p) => {
                        if (vs.length === 0) {
                          p.delete(k);
                          return p;
                        }
                        p.set(k, vs.join(","));
                        return p;
                      });
                    }}
                  />
                </th>
                <th>
                  {" "}
                  <ListFilter
                    _key="deductibility_code"
                    name="Deductibility code"
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
                <th>
                  <ListFilter
                    _key="deductibility_code_pub78"
                    name="Deductibility code (Pub 78)"
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
                <th>
                  <ListFilter
                    _key="foundation_code"
                    name="Foundation code"
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
                <th>
                  <TextFilter
                    num={3}
                    label="Activity code"
                    _key="activity_code"
                    values={(k) => params.get(k)?.split(",") || []}
                    onChange={(vs, k) => {
                      setParams((p) => {
                        if (vs.length === 0) {
                          p.delete(k);
                          return p;
                        }
                        p.set(k, vs.join(","));
                        return p;
                      });
                    }}
                  />
                </th>
                <th>
                  <ListFilter
                    _key="organization_code"
                    name="Organization code"
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
                <th>
                  <ListFilter
                    _key="exempt_organization_status_code"
                    name="Exempt organization status code"
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
                <th>
                  <ListFilter
                    name="Filing requirement code"
                    _key="filing_requirement_code"
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
