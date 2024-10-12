import { FilterIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Search from "./Search";

// import Sorter from "./Sorter";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  return (
    <div
      className={`${classes} grid grid-cols-2 md:grid-cols-[auto_1fr] gap-3`}
    >
      <button
        onClick={() => {
          // remove focus persistor from <Search/>
          params.delete("_f");
          navigate(
            { pathname: "filter", search: params.toString() },
            { replace: true, preventScrollReset: true }
          );
        }}
        className="btn-blue justify-start justify-self-start rounded-lg px-3 py-2 text-sm"
      >
        <FilterIcon size={16} className="mr-2" />
        <span>Filters</span>
      </button>
      <Search classes="order-first col-span-2 md:order-none md:col-span-1" />
      {/* <Sorter /> */}
    </div>
  );
}
