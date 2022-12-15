import { useState } from "react";
import { useParams } from "react-router-dom";
import { Donation, DonationsQueryParams } from "types/aws";
import { useDonationsQuery } from "services/apes";
import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import { Filters } from "components/donations";
import FilterForm from "components/donations/Filter/FilterForm";
import MobileTable from "components/donations/MobileTable";
import Table from "components/donations/Table";
import removeEmptyValue from "helpers/removeEmptyValue";

export default function Donations() {
  const { address } = useParams<{ address: string }>();
  const [filterValues, setFilterValues] = useState<DonationsQueryParams>({
    id: address,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const queryState = useDonationsQuery(filterValues, {
    skip: !address,
  });
  const { isLoading, isFetching, refetch } = queryState;

  const updateFilterValues = (formValues: Filters) => {
    const trimmedFilters = removeEmptyValue({ ...filterValues, ...formValues });
    console.log(trimmedFilters);
    setFilterValues(trimmedFilters as DonationsQueryParams);
    refetch();
  };

  return (
    <div className="relative grid grid-rows-[auto_1fr] padded-container pb-8 pt-4 bg-white dark:bg-blue-d5 text-gray-d2 dark:text-white">
      <div className="flex lg:justify-between lg:items-center justify-center mt-10">
        <h1 className="text-3xl font-bold">My Donations</h1>
      </div>
      {!isLoading && !isFetching && (
        <div className="grid grid-rows-1 sm:grid-cols-3 my-8">
          <div className="sm:col-span-2 sm:mr-4">
            <label htmlFor="search" className="relative">
              <Icon
                type="Search"
                size={24}
                className="absolute top-0 ml-3 text-gray-d1"
              ></Icon>
              <input
                className="py-3 pl-11 pr-4 text-gray-d1 border border-gray-l2 dark:border-bluegray w-full dark:bg-blue-d6"
                type="text"
                placeholder="Search by recipient name, network or currency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </div>
          <FilterForm updateFilterValues={updateFilterValues} />
        </div>
      )}
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching donations..",
          error: "Failed to get donations",
          empty: "No donations found",
        }}
        filterFn={(val) => {
          if (val.chainName && val.charityName) {
            return (
              val.symbol
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase()) ||
              val.chainName
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase()) ||
              val.charityName
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            );
          } else if (val.chainName) {
            return (
              val.symbol
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase()) ||
              val.chainName
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            );
          } else if (val.charityName) {
            return (
              val.symbol
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase()) ||
              val.charityName
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            );
          }
          return val.symbol
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase());
        }}
      >
        {(donations) => {
          return (
            <>
              <CsvExporter
                classes="absolute right-0 mr-5 top-11 hidden lg:flex justify-center p-3 px-8 font-semibold bg-orange uppercase rounded-[4px] text-white"
                headers={csvHeaders}
                data={donations}
                filename="donations.csv"
              >
                Export to CSV
              </CsvExporter>
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
  { key: "usdValue", label: "USD Value" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];
