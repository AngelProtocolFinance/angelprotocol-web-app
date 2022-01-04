import Action from "components/ActionButton/Action";
import { useSetToken } from "contexts/AuthProvider";
import { NavLink, useHistory } from "react-router-dom";
import { admin } from "types/routes";

export default function AdminSideNav() {
  const linkStyles =
    "block uppercase text-sm md:text-lg hover:text-white py-1 px-5 text-center rounded-sm border-0 border-b border-opacity-20 font-semibold";
  const activeStyles = "text-white";

  return (
    <div className="flex flex-col w-128 min-h-3/4 hidden md:block bg-white bg-opacity-10 py-10 rounded-l-xl font-heading">
      <div className="flex-none">
        <h2 className="flex-none text-2xl text-white font-semibold capitalize text-center">
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
          className={linkStyles}
          activeClassName={activeStyles}
          to={`${admin.endowments}`}
        >
          Endowments
        </NavLink>
        <NavLink
          className={linkStyles}
          activeClassName={activeStyles}
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
      {/* side nav footer  */}
      <div className="flex items-end justify-center h-20 relative">
        {/* <button
          className="mt-8 cols-start-1 col-span-2 capitalize hover:text-gray-500 text-white bg-orange disabled:bg-thin-grey shadow-md rounded-md w-48 py-2 font-bold justify-self-center absolute bottom-0"
          onClick={logout}
        >
          Logout
        </button> */}
        <Action
          title="Logout"
          classes="action-button font-light"
          onClick={logout}
        />
      </div>
    </div>
  );
}
