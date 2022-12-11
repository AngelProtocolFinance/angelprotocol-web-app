import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Donation, FilterQuery } from "types/aws";
import { useDonationsQuery } from "services/apes";
import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import MobileTable from "./MobileTable";
import Table from "./Table";
import SearchFilter from "./filter/SearchFilter";

type Filters = {
  transactionDate?: [Date, Date];
  network?: string;
  currency?: string;
  status?: string;
};
export default function Donations() {
  const { address } = useParams<{ address: string }>();
  const [filterValues, setFilterValues] = useState<FilterQuery>({
    id: address,
  });
  const queryState = useDonationsQuery(filterValues, {
    skip: !address,
  });

  useEffect(() => {
    console.log(filterValues);
  }, [filterValues]);

  const updateFilterValues = (values: Filters) => {
    setFilterValues({ ...filterValues, ...values });
  };

  return (
    <div className="grid grid-rows-[auto_1fr] padded-container pb-8 pt-4 bg-white dark:bg-blue-d5 text-gray-d2 dark:text-white">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching donations..",
          error: "Failed to get donations",
          empty: "No donations found",
        }}
      >
        {(donations) => {
          return (
            <>
              <div className="flex lg:justify-between lg:items-center justify-center mt-10">
                <h1 className="text-3xl font-bold">My Donations</h1>
                <CsvExporter
                  classes="hidden lg:flex justify-center p-3 px-8 font-semibold bg-orange uppercase rounded-[4px] hidden lg:block text-white"
                  headers={csvHeaders}
                  data={donations}
                  filename="donations.csv"
                >
                  Export to CSV
                </CsvExporter>
              </div>
              <div className="grid grid-rows-1 sm:grid-cols-3 my-8">
                <div className="sm:col-span-2 sm:mr-4">
                  <label htmlFor="search" className="relative">
                    <Icon
                      type="Search"
                      size={24}
                      className="absolute top-0 ml-3 text-gray-d1"
                    ></Icon>
                    <input
                      className="py-3 pl-11 pr-4 border border-gray-l2 dark:border-bluegray w-full dark:bg-blue-d6"
                      type="text"
                      placeholder="Search donations..."
                    />
                  </label>
                </div>
                <div className="hidden sm:block">
                  <SearchFilter updateFilterValues={updateFilterValues} />
                </div>
                <div className="grid grid-cols-1 sm:hidden mt-2 gap-2">
                  <SearchFilter updateFilterValues={updateFilterValues} />
                </div>
              </div>
              <Table donations={donations} />
              <MobileTable donations={donations} />
              <CsvExporter
                classes="lg:hidden justify-center text-white mt-6 p-3 px-8 font-semibold bg-orange uppercase rounded-[4px]"
                headers={csvHeaders}
                data={donations}
                filename="donations.csv"
              >
                Export to CSV
              </CsvExporter>
            </>
          );
        }}
      </QueryLoader>
    </div>
  );
}

const csvHeaders: { key: keyof Donation; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];
