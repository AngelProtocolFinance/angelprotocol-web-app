import { useState } from "react";
import { useParams } from "react-router-dom";
import { Donation, FilterQuery, Filters } from "types/aws";
import { useDonationsQuery } from "services/apes";
import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import MobileTable from "./MobileTable";
import Table from "./Table";
import SearchFilter from "./filter/SearchFilter";

export default function Donations() {
  const { address } = useParams<{ address: string }>();
  const [filterValues, setFilterValues] = useState<FilterQuery>({
    id: address,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const queryState = useDonationsQuery(filterValues, {
    skip: !address,
  });
  const { refetch } = queryState;

  const updateFilterValues = (values: Filters) => {
    setFilterValues({ ...filterValues, ...values });
    refetch();
  };

  return (
    <div className="grid grid-rows-[auto_1fr] padded-container pb-8 pt-4 bg-white dark:bg-blue-d5 text-gray-d2 dark:text-white">
      <div className="flex lg:justify-between lg:items-center justify-center mt-10">
        <h1 className="relative text-3xl font-bold">My Donations</h1>
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
              className="py-3 pl-11 pr-4 text-gray-d1 border border-gray-l2 dark:border-bluegray w-full dark:bg-blue-d6"
              type="text"
              placeholder="Search donations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>
        <div className="hidden sm:block">
          <SearchFilter
            updateFilterValues={updateFilterValues}
            address={address}
          />
        </div>
        <div className="grid grid-cols-1 sm:hidden mt-2 gap-2">
          <SearchFilter
            updateFilterValues={updateFilterValues}
            address={address}
          />
        </div>
      </div>
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
                classes="absolute hidden lg:flex justify-center p-3 px-8 font-semibold bg-orange uppercase rounded-[4px] text-white right-[5.8rem] top-[8.5rem]"
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
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];
