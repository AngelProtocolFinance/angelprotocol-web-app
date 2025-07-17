import { Link, useSearchParams } from "@remix-run/react";
import type { LoaderData } from "./api";
import { ListFilter } from "./list-filter";
import { Paginator } from "./paginator";
import { RangeFilter } from "./range-filter";
export { loader, action } from "./api";
export { clientLoader } from "api/cache";
import { useCachedLoaderData } from "api/cache";
import ExtLink from "components/ext-link";
import { toYYYMMDD } from "components/form";
import { XIcon } from "lucide-react";
import { filter_factory } from "./common";
import { Contacts } from "./contacts";
import { DateFilter } from "./date-filter";
import { H } from "./header";
import { Socials } from "./socials";
import type { ISort } from "./sort";
import { TextFilter } from "./text-filter";

const _usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Page() {
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
        <div className="font-bold my-2 flex items-center gap-x-2">
          <p>found: {data.num_items}</p>
          {data.num_items > 0 && (
            <a
              aria-disabled={data.num_items > 100_000}
              href={`/api/marketing/npos/export?${params.toString()}`}
              className="btn btn-blue text-xs px-3 py-1"
            >
              {data.num_items > 100_000 ? "Too many records" : "Export"}
            </a>
          )}
        </div>
        <div className="overflow-x-auto relative">
          <table className="self-start border-collapse overflow-x-auto [&_th]:text-left [&_th]:align-top [&_th]:text-balance [&_td]:text-nowrap [&_td,&_th]:p-2 [&_td,&_th]:border [&_td,&_th]:border-gray-l3">
            <thead>
              <tr>
                <H
                  k="last_updated"
                  filter={(k) => <DateFilter {...filter_props(k)} />}
                  sort={sort_obj}
                >
                  Date
                </H>
                <H>EIN</H>
                <H>Name</H>
                <H
                  k="website"
                  filter={(k) => (
                    <ListFilter {...filter_props(k)} optsFn={async () => []} />
                  )}
                >
                  Website
                </H>
                <H
                  k="contacts"
                  filter={(k) => (
                    <ListFilter {...filter_props(k)} optsFn={async () => []} />
                  )}
                >
                  Contacts
                </H>
                <H
                  k="social_media"
                  filter={(k) => (
                    <ListFilter {...filter_props(k)} optsFn={async () => []} />
                  )}
                >
                  Socials
                </H>
                <H
                  k="donation_platform"
                  filter={(k) => (
                    <ListFilter {...filter_props(k)} optsFn={async () => []} />
                  )}
                >
                  Donation platform
                </H>
                <H
                  k="asset_code"
                  filter={(k) => <ListFilter {...filter_props(k)} />}
                >
                  Asset Code
                </H>
                <H
                  k="asset_amount"
                  filter={(k) => <RangeFilter {...filter_props(k)} />}
                  sort={sort_obj}
                >
                  Assets
                </H>
                <H
                  k="income_code"
                  filter={(k) => <ListFilter {...filter_props(k)} />}
                >
                  Income code
                </H>
                <H
                  k="income_amount"
                  filter={(k) => <RangeFilter {...filter_props(k)} />}
                  sort={sort_obj}
                >
                  Income
                </H>
                <H
                  k="revenue_amount"
                  filter={(k) => <RangeFilter {...filter_props(k)} />}
                  sort={sort_obj}
                >
                  Revenue
                </H>

                <H>City</H>
                <H
                  k={
                    !params.get("country") ||
                    /\b(USA|United\s+States)\b/i.test(
                      params.get("country") || ""
                    )
                      ? "state"
                      : undefined
                  }
                  filter={(k) => <ListFilter {...filter_props(k)} />}
                >
                  State
                </H>
                <H
                  k="country"
                  filter={(k) => <ListFilter {...filter_props(k)} />}
                >
                  Country
                </H>
                <H
                  k="ntee_code"
                  filter={(k) => (
                    <TextFilter
                      num={1}
                      description="can query partial e.g. A (starts with A) or complete (A80)"
                      {...filter_props(k)}
                    />
                  )}
                >
                  NTEE Code
                </H>

                <H>Group exemption number</H>
                <H
                  k="subsection_code"
                  filter={(k) => (
                    <TextFilter
                      num={1}
                      description="can query partial e.g. A (starts with A) or complete (A80)"
                      {...filter_props(k)}
                    />
                  )}
                >
                  Subsection code
                </H>
                <H
                  k="affilation_code"
                  filter={(k) => <ListFilter {...filter_props(k)} />}
                >
                  Affiliation code
                </H>
                <H
                  k="classification_code"
                  filter={(k) => (
                    <TextFilter
                      num={4}
                      description="NPOs may have up to 4 classification codes"
                      {...filter_props(k)}
                    />
                  )}
                >
                  Classification code
                </H>
                <H
                  k="deductibility_code"
                  filter={(k) => <ListFilter {...filter_props(k)} />}
                >
                  Deductibility code
                </H>
                <H
                  k="deductibility_code_pub78"
                  filter={(k) => <ListFilter {...filter_props(k)} />}
                >
                  Deductibility code (Pub. 78)
                </H>
                <H
                  k="foundation_code"
                  filter={(k) => <ListFilter {...filter_props(k)} />}
                >
                  Foundation code
                </H>
                <H
                  k="activity_code"
                  filter={(k) => (
                    <TextFilter
                      num={3}
                      description="NPOs may have up to 3 activity codes"
                      {...filter_props(k)}
                    />
                  )}
                >
                  Activity code
                </H>
                <H
                  k="organization_code"
                  filter={(k) => <ListFilter {...filter_props(k)} />}
                >
                  Organization code
                </H>
                <H
                  k="exempt_organization_status_code"
                  filter={(k) => <ListFilter {...filter_props(k)} />}
                >
                  Exempt organization status code
                </H>
                <H
                  k="filing_requirement_code"
                  filter={(k) => <ListFilter {...filter_props(k)} />}
                >
                  Filing requirement code
                </H>
                <H
                  k="sort_name"
                  filter={(k) => (
                    <ListFilter {...filter_props(k)} optsFn={async () => []} />
                  )}
                >
                  Sort name
                </H>
              </tr>
            </thead>
            <tbody>
              {data.items.map((d, i) => (
                <tr key={d._id + i}>
                  <td>
                    {d.last_updated && toYYYMMDD(new Date(d.last_updated))}
                  </td>
                  <td>{d.ein}</td>
                  <td>{d.name}</td>
                  <td>
                    {d.website && (
                      <ExtLink
                        className="text-blue-d1 hover:text-blue text-wrap "
                        href={((x) => {
                          if (!x.startsWith("http")) {
                            return `http://${x}`;
                          }
                          return x;
                        })(d.website)}
                      >
                        {d.website}
                      </ExtLink>
                    )}
                  </td>
                  <td>
                    <Contacts contacts={d.contacts ?? []} />
                  </td>
                  <td>
                    <Socials socials={d.social_media ?? []} />
                  </td>
                  <td>
                    <p className="text-wrap">{d.donation_platform}</p>
                  </td>
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
