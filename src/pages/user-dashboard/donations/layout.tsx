import { nav_link_class_fn } from "helpers/create-navlink-styler";
import { NavLink, Outlet } from "react-router";

const class_fn = nav_link_class_fn(
  "relative group w-full sm:w-52 p-2.5 text-xs sm:text-sm font-bold leading-5 focus:outline-hidden bg-blue-l5 hover:bg-blue-l3",
  "bg-blue-l4 z-20"
);
export default function Layout() {
  return (
    <div className="grid content-start relative">
      <h1 className="text-3xl mb-6">My Donations</h1>

      <div className="flex">
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
      </div>
      <Outlet />
    </div>
  );
}
