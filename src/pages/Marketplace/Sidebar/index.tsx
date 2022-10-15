import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { reset, toggle } from "slices/components/marketFilter";
import SDGGroups from "./SDGGroups";

export default function Sidebar({ classes = "" }: { classes?: string }) {
  const dispatch = useSetter();

  function toggleFilter() {
    dispatch(toggle());
  }

  return (
    <div
      className={`border border-gray-l2 overflow-hidden rounded-md content-start min-w-[18rem] bg-orange-l6 ${classes}`}
    >
      <div className="flex justify-between p-3 items-center md:hidden border-b border-gray-l2">
        <h3 className="text-orange text-lg font-bold uppercase">Filters</h3>
        <button onClick={toggleFilter} className="active:text-orange">
          <Icon type="Close" size={25} />
        </button>
      </div>
      <div className="bg-orange-l5 font-heading flex items-center justify-between p-3 border-b border-gray-l2">
        <h3 className="uppercase font-bold">Filter by</h3>
        <button
          type="button"
          onClick={() => {
            dispatch(reset());
          }}
          className="text-gray-d1 text-xs"
        >
          Reset Filters
        </button>
      </div>
      <SDGGroups />
    </div>
  );
}
