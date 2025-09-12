import CsvExporter from "components/csv-exporter";
import { humanize } from "helpers/decimal";
import { replaceWithEmptyString as fill } from "helpers/replace-with-empty-string";
import { use_paginator } from "hooks/use-paginator";
import { Search } from "lucide-react";
import { useState } from "react";
import { Outlet, useSearchParams } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Donation } from "types/donations";
import type { Route } from "./+types";
import Filter from "./filter";
import NoDonations from "./no-donations";
import StatusTabs from "./status-tabs";
import { Table } from "./table";

export { loader } from "./donations-loader";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export { ErrorBoundary } from "components/error";
export default CacheRoute(Donations);

function Donations({ loaderData }: Route.ComponentProps) {
  const [params, setParams] = useSearchParams();
  const status = (params.get("status") ?? "final") as Donation.Status;
  const { user, ...page1 } = loaderData;
  const { node, loading, items } = use_paginator({
    table: (props) => <Table {...props} status={status} />,
    classes: "mt-2",
    empty: ({ classes }) => (
      <NoDonations
        classes={`${classes} place-self-center col-span-full`}
        status={status}
      />
    ),
    page1,
    gen_loader: (load, next) => () => {
      const copy = new URLSearchParams(params);
      if (next) copy.set("page", next.toString());
      load(`?${copy.toString()}`);
    },
  });

  const [query, setQuery] = useState("");

  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 @5xl:gap-y-8 @5xl:gap-x-3 relative">
      {/** render kyc form here */}
      <Outlet />
      <h1 className="text-3xl text-center @5xl:text-left col-span-full @5xl:col-span-1 mb-4 @5xl:mb-0">
        My Donations
      </h1>
      <CsvExporter
        aria-disabled={loading || items.length === 0}
        classes="row-start-5 @5xl:row-auto col-span-full @5xl:col-span-1 @5xl:justify-self-end btn btn-blue px-8 py-3"
        headers={csvHeaders}
        data={
          items.map((item) => {
            return fill({
              recipientName: item.recipient_name,
              date: new Date(item.date).toLocaleDateString(),
              paymentMethod: item.payment_method,
              isRecurring: item.is_recurring ? "Yes" : "No",
              symbol: item.symbol,
              initAmount: humanize(item.init_amount, 2),
              initAmountUsd: humanize(item.init_amount_usd ?? 0, 2),
              id: item.id,
              receipt: item.donor_details?.address?.country ? "Yes" : "No",
            });
          }) ?? []
        }
        filename={
          status === "final" ? "donations.csv" : "pending-donations.csv"
        }
      >
        Export to CSV
      </CsvExporter>
      <div className="relative flex gap-x-3 items-center border border-gray-l3 w-full bg-white dark:bg-blue-d6 rounded-sm">
        <Search
          size={20}
          className="text-gray-d4 dark:text-gray absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          className="p-3 pl-10 placeholder:text-gray dark:placeholder:text-gray bg-transparent w-full outline-hidden disabled:bg-gray-l3 dark:disabled:bg-gray-d3"
          type="text"
          placeholder="Search donations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Filter
        isDisabled={loading}
        classes="col-span-full @5xl:col-span-1 w-full @5xl:w-auto"
      />
      <div className="grid col-span-full gap-y-4">
        <StatusTabs
          status={status}
          changeStatus={(s) => {
            const copy = new URLSearchParams(params);
            copy.set("status", s ?? "final");
            setParams(copy);
          }}
        />
        {node}
      </div>
    </div>
  );
}

const csvHeaders: { key: keyof Donation.Item | "receipt"; label: string }[] = [
  { key: "recipient_name", label: "Recipient" },
  { key: "date", label: "Date" },
  { key: "payment_method", label: "Donation Type" },
  { key: "is_recurring", label: "Recurring" },
  { key: "symbol", label: "Currency" },
  { key: "init_amount", label: "Amount" },
  { key: "init_amount_usd", label: "USD Value" },
  { key: "id", label: "Transaction Hash" },
  { key: "receipt", label: "Receipt" },
];
