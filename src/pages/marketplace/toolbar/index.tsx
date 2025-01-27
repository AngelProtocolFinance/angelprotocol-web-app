import { NavLink, useSearchParams } from "@remix-run/react";
import { FilterIcon } from "lucide-react";
import Search from "./search";

// import Sorter from "./Sorter";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  const [params] = useSearchParams();
  return (
    <div
      className={`${classes} grid grid-cols-2 md:grid-cols-[auto_1fr] gap-3`}
    >
      <NavLink
        replace
        preventScrollReset
        to={{ pathname: "filter", search: params.toString() }}
        className="btn-blue justify-start justify-self-start rounded-lg px-3 py-2 text-sm"
      >
        <FilterIcon size={16} className="mr-2" />
        <span>Filters</span>
      </NavLink>
      <Search classes="order-first col-span-2 md:order-none md:col-span-1" />
      {/* <Sorter /> */}
    </div>
  );
}
