import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { reset, toggle } from "slices/components/marketFilter";
import KYCFilter from "./KYCFilter";
import SDGGroups from "./SDGGroups";
import Types from "./Types";

export default function Sidebar({ classes = "" }: { classes?: string }) {
  const dispatch = useSetter();

  function toggleFilter() {
    dispatch(toggle());
  }

  return (
    <div
      className={`border border-gray-l2 dark:border-bluegray dark:bg-blue-d5 dark:text-white overflow-hidden rounded-md content-start min-w-[18rem] bg-gray-l5 pb-3 ${classes}`}
    >
      <div className="flex justify-between p-3 items-center md:hidden dark:bg-blue-d7 border-b border-gray-l2">
        <h3 className="text-orange text-lg font-bold uppercase">Filters</h3>
        <button onClick={toggleFilter} className="active:text-orange">
          <Icon type="Close" size={25} />
        </button>
      </div>
      <div className="bg-orange-l6 dark:bg-blue-d7 flex items-center justify-between p-3 border-b border-gray-l2 dark:border-bluegray">
        <h3 className="uppercase font-bold">Filter by</h3>
        <button
          type="button"
          onClick={() => {
            dispatch(reset());
          }}
          className="text-gray-d1 dark:text-gray-l2 text-xs"
        >
          Reset Filters
        </button>
      </div>

      <KYCFilter classes="ml-3 mt-3" />
      <Types />
      <SDGGroups />
    </div>
  );
}
