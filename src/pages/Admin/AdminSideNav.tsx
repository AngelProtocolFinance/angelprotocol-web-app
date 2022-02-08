import { NavLink } from "react-router-dom";
import { admin } from "types/routes";

export default function AdminSideNav() {
  const linkStyles =
    "block uppercase text-sm md:text-lg text-white hover:text-gray-700 py-1 p-5 text-center rounded-sm border-b border-opacity-20 font-semibold";
  const activeStyles = "text-angel-orange";

  return (
    <div className="flex flex-col w-128 min-h-3/4 hidden md:block bg-white bg-opacity-10 py-10 rounded-l-xl font-heading">
      <div className="flex-none">
        <h2 className="flex-none text-2xl font-semibold capitalize text-center text-white">
          <span className="inline-block">Angel Protocol:</span>
          <span className="inline-block">Admin Portal</span>
        </h2>
      </div>
      <div className="mt-10 flex flex-col flex-grow gap-4 align-items-start justify-start max-h-3/4 min-h-1/2">
        <NavLink
          activeClassName={activeStyles}
          className={linkStyles}
          to={`${admin.charity_applications}`}
          exact
        >
          Charity Applications
        </NavLink>
        <NavLink
          activeClassName={activeStyles}
          className={linkStyles}
          to={`${admin.endowments}`}
        >
          Endowments
        </NavLink>
        <NavLink
          activeClassName={activeStyles}
          className={linkStyles}
          to={`${admin.index_fund_management}`}
        >
          Index Funds
        </NavLink>
        <NavLink
          activeClassName={activeStyles}
          className={linkStyles}
          to={`${admin.alliance_members}`}
        >
          Alliance Members
        </NavLink>
      </div>
    </div>
  );
}
