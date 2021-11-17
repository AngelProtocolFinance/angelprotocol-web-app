import { NavLink, useRouteMatch } from "react-router-dom";
import { app } from "types/routes";

export default function SideNav() {
  const { url } = useRouteMatch();
  const linkStyles =
    "block uppercase text-sm md:text-lg text-gray-400 hover:text-gray-700 py-1 p-5 text-center rounded-sm border-t border-b border-opacity-20";
  const activeStyles = "bg-white bg-opacity-40 text-gray-600";

  return (
    <div className="flex flex-col w-128 min-h-3/4 hidden md:block bg-gray-200 p-10">
      <div className="flex-none">
        <h2 className="flex-none text-2xl font-semibold capitalize text-center">
          <span className="inline-block">Angel Protocol:</span>
          <span className="inline-block">Admin Portal</span>
        </h2>
      </div>
      {/* side nav body */}
      <div className="mt-10 flex flex-col flex-grow gap-4 align-items-start justify-start min-h-3/4">
        <NavLink
          activeClassName={activeStyles}
          className={linkStyles}
          to={`${url}`}
          exact
        >
          Charity Applications
        </NavLink>
        <NavLink
          activeClassName={activeStyles}
          className={linkStyles}
          to={`${url}/${app.board_tca}`}
        >
          Endowments
        </NavLink>
        <NavLink
          activeClassName={activeStyles}
          className={linkStyles}
          to={`${url}/${app.board_tca}`}
        >
          Index Funds
        </NavLink>
        <NavLink
          activeClassName={activeStyles}
          className={linkStyles}
          to={`${url}/${app.board_tca}`}
        >
          Alliance Members
        </NavLink>
      </div>
      {/* side nav footer  */}
      <div className="flex justify-center h-20 relative justify-end">
        <button className="mt-8 cols-start-1 col-span-2 capitalize hover:text-gray-500 text-white bg-orange disabled:bg-thin-grey shadow-md rounded-md w-48 py-2 font-bold justify-self-center absolute bottom-0">
          Logout
        </button>
      </div>
    </div>
  );
}
