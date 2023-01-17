import { useState } from "react";
import { useParams } from "react-router-dom";
import { Donation, DonationsQueryParams } from "types/aws";
import { useDonationsQuery } from "services/apes";
import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import useDebouncer from "hooks/useDebouncer";
import Filter from "./Filter";
import MobileTable from "./MobileTable";
import Table from "./Table";

export default function Donations() {
  const { address } = useParams<{ address: string }>();

  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, isDebouncing] = useDebouncer(query, 500);

  const [params, setParams] = useState<DonationsQueryParams>({
    id: address || "",
  });

  const {
    data: donations,
    isLoading,
    isError,
  } = useDonationsQuery(params, {
    skip: !address,
    selectFromResult({ data = [], ...rest }) {
      const filtered = data.filter(({ kycData, ...flatFields }) =>
        Object.values(flatFields)
          .reduce<string>(
            (result, val) => `${val}`.toLocaleLowerCase() + result,
            ""
          )
          .includes(debouncedQuery)
      );

      return { data: filtered, ...rest };
    },
  });

  return (
    <div className="grid grid-cols-[1fr_auto] gap-8 relative padded-container pt-20 pb-8">
      <h1 className="text-3xl font-bold">My Donations</h1>
      <CsvExporter
        aria-disabled={isLoading || isError || isDebouncing}
        classes="justify-self-end btn btn-orange px-8 py-3 rounded  aria-disabled:pointer-events-none aria-disabled:bg-gray-l2 dark:aria-disabled:bg-gray"
        headers={csvHeaders}
        data={donations}
        filename="donations.csv"
      >
        Export to CSV
      </CsvExporter>
      <div className="">
        <label htmlFor="search" className="relative">
          <Icon
            type="Search"
            size={24}
            className="absolute top-0 ml-3 text-gray-d1"
          />
          <input
            className="py-3 pl-11 pr-4 text-gray-d1 border border-gray-l2 dark:border-bluegray w-full bg-white dark:bg-blue-d6 rounded-md"
            type="text"
            placeholder="Search donations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <Filter setParams={setParams} donorAddress={address || ""} />
      <Table donations={donations} classes="hidden lg:table col-span-full" />
      <MobileTable donations={donations} classes="lg:hidden col-span-full" />
    </div>
  );
}

const csvHeaders: { key: keyof Donation; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "usdValue", label: "USD Value" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];
