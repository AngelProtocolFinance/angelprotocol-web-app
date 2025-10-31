import { nav_link_class_fn } from "helpers/create-navlink-styler";
import { NavLink, Outlet } from "react-router";

const class_fn = nav_link_class_fn(
  "px-4 p-1 text-sm sm:text-sm leading-5 z-20 font-bold",
  "bg-blue-l4",
  "text-gray"
);
export default function Layout() {
  return (
    <div className="grid content-start relative px-6 py-4 md:px-10 md:py-8">
      <div className="flex flex-wrap gap-y-4 justify-between items-center mb-2">
        <h1 className="text-3xl">My Donations</h1>
        <div className="flex items-center divide-x divide-gray-l3">
          <NavLink to="received" className={class_fn}>
            Received
          </NavLink>
          <NavLink to="pending" className={class_fn}>
            Pending
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
