import { useParams } from "react-router-dom";
import { useDonationsQuery } from "services/apes";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import SearchFilter from "./SearchFilter";
import SortByDropdown from "./SortByDropdown";
import Table from "./Table";

// import DonationsTable from "./DonationsTable";

export default function Donations() {
  const { address } = useParams<{ address: string }>();
  const queryState = useDonationsQuery(
    { id: address! },
    {
      skip: !address,
    }
  );

  return (
    <div className="grid grid-rows-[auto_1fr] padded-container pb-8 pt-28 bg-white dark:bg-blue-d4">
      <div className="flex sm:justify-between justify-center mt-10 sm:mb-6">
        <h1 className="text-2xl font-bold sm:mb-4 text-gray-d2 dark:text-white">
          My Donations
        </h1>
        <button className="p-3 px-8 font-semibold bg-orange uppercase rounded-sm hidden sm:block text-white">
          Export to CSV
        </button>
      </div>
      <div className="grid grid-rows-2 sm:grid-cols-3 my-8">
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
          <SearchFilter />
        </div>
        <div className="grid grid-cols-2 sm:hidden mt-2 gap-2">
          <SearchFilter />
          <SortByDropdown />
        </div>
      </div>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching donations..",
          error: "Failed to get donations",
          empty: "No donations found",
        }}
      >
        {(donations) => <Table donations={donations} />}
      </QueryLoader>
      <button className="mt-6 p-3 px-8 font-semibold bg-orange uppercase rounded-sm sm:hidden">
        Export to CSV
      </button>
    </div>
  );
}
