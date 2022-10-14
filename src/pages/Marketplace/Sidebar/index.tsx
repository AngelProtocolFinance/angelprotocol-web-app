import { useSetter } from "store/accessors";
import { reset } from "slices/components/marketFilter";
import SDGGroups from "./SDGGroups";

export default function Sidebar() {
  const dispatch = useSetter();

  return (
    <div className="border-2 border-gray-l3 rounded-md grid content-start w-60">
      <div className="bg-orange-l5 font-heading flex items-center justify-between p-3">
        <h3 className="uppercase font-bold">filter by</h3>
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
