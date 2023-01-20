import { useState } from "react";
import { useParams } from "react-router-dom";
import { Donation, DonationsQueryParams } from "types/aws";
import { useDonationsQuery } from "services/apes";
import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import useDebouncer from "hooks/useDebouncer";
import { isEmpty } from "helpers";
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

  const queryState = useDonationsQuery(params, {
    skip: !address,
    selectFromResult({ data = [], ...rest }) {
      const filtered = data.filter(({ kycData, ...flatFields }) =>
        Object.values(flatFields)
          .reduce<string>((result, val) => `${val}` + result, "")
          .toLocaleLowerCase()
          .includes(debouncedQuery.toLocaleLowerCase())
      );

      return { data: filtered, ...rest };
    },
  });

  const { isLoading, isError, data } = queryState;

  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container pt-8 lg:pt-20 pb-8">
      <h1 className="text-3xl font-bold max-lg:text-center max-lg:col-span-full max-lg:mb-4">
        My Donations
      </h1>
      <CsvExporter
        aria-disabled={isLoading || isError || isDebouncing || isEmpty(data)}
        classes="max-lg:row-start-5 max-lg:col-span-full lg:justify-self-end btn btn-orange px-8 py-3 rounded  aria-disabled:pointer-events-none aria-disabled:bg-gray-l2 dark:aria-disabled:bg-gray"
        headers={csvHeaders}
        data={data}
        filename="donations.csv"
      >
        Export to CSV
      </CsvExporter>
      <div className="relative flex gap-x-3 items-center border border-gray-l2 dark:border-bluegray w-full bg-white dark:bg-blue-d6 rounded">
        <Icon
          type="Search"
          size={24}
          className="text-gray-d2 dark:text-gray absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          disabled={isError}
          className="p-3 pl-10 placeholder:text-gray-d1 dark:placeholder:text-gray bg-transparent w-full outline-none disabled:bg-gray-l2 dark:disabled:bg-bluegray-d1"
          type="text"
          placeholder="Search donations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Filter
        isDisabled={isLoading || isError || isDebouncing}
        setParams={setParams}
        donorAddress={address || ""}
        classes="max-lg:col-span-full max-lg:w-full"
      />
      <QueryLoader
        queryState={{ ...queryState, isLoading: isLoading || isDebouncing }}
        messages={{
          loading: "Loading donations..",
          error: "Failed to get donations",
          empty: "No donations found",
        }}
      >
        {(donations) => (
          <>
            <Table
              donations={donations}
              classes="hidden max-lg:my-4 lg:table col-span-full"
            />
            <MobileTable
              donations={donations}
              classes="lg:hidden max-lg:my-4 col-span-full"
            />
          </>
        )}
      </QueryLoader>
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
