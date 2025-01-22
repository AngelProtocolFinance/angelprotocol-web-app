import { Outlet, useFetcher, useSearchParams } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import CsvExporter from "components/CsvExporter";
import { replaceWithEmptyString as fill, humanize } from "helpers";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { Donation } from "types/aws";
import Filter from "./Filter";
import MobileTable from "./MobileTable";
import NoDonations from "./NoDonations";
import StatusTabs from "./StatusTabs";
import Table from "./Table";
import type { DonationsData } from "./donations-loader";

export { loader } from "./donations-loader";
export { ErrorBoundary } from "components/error";
export { clientLoader } from "api/cache";

export default function Donations() {
  const [params, setParams] = useSearchParams();
  const { load, data, state } = useFetcher<DonationsData>();
  const { user, ...firstPage } = useCachedLoaderData<DonationsData>();
  const [items, setItems] = useState<Donation.Record[]>(firstPage.Items);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!data || state !== "idle") return;
    setItems((prev) => [...prev, ...data.Items]);
  }, [data, state]);

  const nextPage = data ? data.nextPage : firstPage.nextPage;
  function loadNextPage() {
    if (!nextPage) return;
    const p = new URLSearchParams(params);
    p.set("page", nextPage.toString());
    load(`?${p.toString()}`);
  }

  const status: Donation.Status = (params.get("status") ??
    "final") as Donation.Status;
  const isLoading = state !== "idle";

  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 @5xl:gap-y-8 @5xl:gap-x-3 relative">
      {/** render kyc form here */}
      <Outlet />
      <h1 className="text-3xl text-center @5xl:text-left col-span-full @5xl:col-span-1 mb-4 @5xl:mb-0">
        My Donations
      </h1>
      <CsvExporter
        aria-disabled={isLoading || items.length === 0}
        classes="row-start-5 @5xl:row-auto col-span-full @5xl:col-span-1 @5xl:justify-self-end btn-blue px-8 py-3"
        headers={csvHeaders}
        data={
          items.map((item) => {
            return fill({
              recipientName: item.recipientName,
              date: new Date(item.date).toLocaleDateString(),
              paymentMethod: item.paymentMethod,
              isRecurring: item.isRecurring ? "Yes" : "No",
              symbol: item.symbol,
              initAmount: humanize(item.initAmount, 2),
              initAmountUsd: humanize(item.initAmountUsd ?? 0, 2),
              id: item.id,
              receipt: item.donorDetails?.address?.country
                ? "Yes"
                : "No" ?? "No",
            });
          }) ?? []
        }
        filename={
          status === "final" ? "donations.csv" : "pending-donations.csv"
        }
      >
        Export to CSV
      </CsvExporter>
      <div className="relative flex gap-x-3 items-center border border-gray-l4 w-full bg-white dark:bg-blue-d6 rounded">
        <Search
          size={20}
          className="text-navy-d4 dark:text-navy-l2 absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          className="p-3 pl-10 placeholder:text-navy-l1 dark:placeholder:text-navy-l2 bg-transparent w-full outline-none disabled:bg-gray-l3 dark:disabled:bg-navy-d3"
          type="text"
          placeholder="Search donations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Filter
        isDisabled={isLoading}
        classes="col-span-full @5xl:col-span-1 w-full @5xl:w-auto"
      />
      <div className="grid col-span-full overflow-x-auto">
        <StatusTabs
          status={status}
          changeStatus={(s) => {
            const copy = new URLSearchParams(params);
            copy.set("status", s ?? "final");
            setParams(copy);
          }}
        />
        <div className="p-5 bg-gray-l6 border border-gray-l4 rounded-b @2xl:rounded-tr grid">
          {items.length === 0 ? (
            <NoDonations
              classes="mt-8 place-self-center col-span-full"
              status={status}
            />
          ) : (
            <div className="grid">
              <Table
                donations={items}
                disabled={isLoading}
                hasMore={!!nextPage}
                isLoading={isLoading}
                status={status}
                onLoadMore={loadNextPage}
                classes="hidden mt-4 @5xl:mt-0 @5xl:table"
              />
              <MobileTable
                donations={items}
                disabled={isLoading}
                hasMore={!!nextPage}
                status={status}
                isLoading={isLoading}
                onLoadMore={loadNextPage}
                classes="@5xl:hidden my-4 @5xl:my-0"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const csvHeaders: { key: keyof Donation.Record | "receipt"; label: string }[] =
  [
    { key: "recipientName", label: "Recipient" },
    { key: "date", label: "Date" },
    { key: "paymentMethod", label: "Donation Type" },
    { key: "isRecurring", label: "Recurring" },
    { key: "symbol", label: "Currency" },
    { key: "initAmount", label: "Amount" },
    { key: "initAmountUsd", label: "USD Value" },
    { key: "id", label: "Transaction Hash" },
    { key: "receipt", label: "Receipt" },
  ];
