import { nav_link_class_fn } from "helpers/create-navlink-styler";
import { NavLink, Outlet } from "react-router";

const class_fn = nav_link_class_fn(
  "relative group w-full sm:w-52 p-2.5 text-xs sm:text-sm font-bold leading-5 focus:outline-hidden bg-blue-l5 hover:bg-blue-l3",
  "bg-blue-l4 z-20"
);
export default function Layout() {
  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 @5xl:gap-y-8 @5xl:gap-x-3 relative">
      <h1 className="text-3xl text-center @5xl:text-left col-span-full @5xl:col-span-1 mb-4 @5xl:mb-0">
        My Donations
      </h1>

      <div className="grid col-span-full gap-y-4">
        <NavLink to="received" className={class_fn}>
          <span
            className="uppercase group-active:outline-hidden group-active:rounded-xs 
        group-active:outline-2 group-active:outline-offset-2 group-active:outline-blue-d1"
          >
            Received
          </span>
        </NavLink>
        <NavLink to="pending" className={class_fn}>
          <span
            className="uppercase group-active:outline-hidden group-active:rounded-xs 
        group-active:outline-2 group-active:outline-offset-2 group-active:outline-blue-d1"
          >
            Pending
          </span>
        </NavLink>

        <Outlet />
      </div>
    </div>
  );
}
