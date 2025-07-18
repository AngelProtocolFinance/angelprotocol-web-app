import { Outlet, useFetcher, useSearchParams } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import CsvExporter from "components/csv-exporter";
import { humanize } from "helpers/decimal";
import { replaceWithEmptyString as fill } from "helpers/replace-with-empty-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { Donation } from "types/donations";
import type { DonationsData } from "./donations-loader";
import Filter from "./filter";
import MobileTable from "./mobile-table";
import NoDonations from "./no-donations";
import StatusTabs from "./status-tabs";
import Table from "./table";

export { loader } from "./donations-loader";
export { ErrorBoundary } from "components/error";
export { clientLoader } from "api/cache";

export default function Donations() {
  const [params, setParams] = useSearchParams();
  const { load, data, state } = useFetcher<DonationsData>();
  const { user, ...page1 } = useCachedLoaderData<DonationsData>();
  const [items, setItems] = useState<Donation.Item[]>(page1.items);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!data || state !== "idle") return;
    setItems((prev) => [...prev, ...data.items]);
  }, [data, state]);

  useEffect(() => {
    setItems(page1.items);
  }, [page1.items]);

  const nextPage = data ? data.next_page : page1.next_page;
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
        <div className="p-5 bg-gray-l6 border border-gray-l3 rounded-b @2xl:rounded-tr grid">
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
