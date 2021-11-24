import { useSetToken } from "contexts/AuthProvider";
import { NavLink, useHistory } from "react-router-dom";
import { admin } from "types/routes";

export default function AdminSideNav() {
  const history = useHistory();
  const { deleteToken } = useSetToken();

  const logout = () => {
    deleteToken("admin");
    history.push(admin.login);
  };

  const linkStyles =
    "block uppercase text-sm md:text-lg text-gray-400 hover:text-gray-700 py-1 p-5 text-center rounded-sm border-t border-b border-opacity-20 font-semibold";
  const activeStyles = "bg-white bg-opacity-40 text-angel-blue";

  return (
    <div className="flex flex-col w-128 min-h-3/4 hidden md:block bg-gray-200 py-10 rounded-l-xl font-heading">
      <div className="flex-none">
        <h2 className="flex-none text-2xl font-semibold capitalize text-center">
          <span className="inline-block">Angel Protocol:</span>
          <span className="inline-block">Admin Portal</span>
        </h2>
      </div>
      {/* side nav body */}
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
          to={`${admin.aliance_members}`}
        >
          Alliance Members
        </NavLink>
      </div>
      {/* side nav footer  */}
      <div className="flex justify-center h-20 relative justify-end">
        <button
          className="mt-8 cols-start-1 col-span-2 capitalize hover:text-gray-500 text-white bg-orange disabled:bg-thin-grey shadow-md rounded-md w-48 py-2 font-bold justify-self-center absolute bottom-0"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
