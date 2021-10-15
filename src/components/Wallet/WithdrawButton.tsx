import { app } from "types/routes";
import { NavLink, useRouteMatch } from "react-router-dom";

export default function WithdrawButton() {
  const { url } = useRouteMatch();
  return (
    <NavLink to={`${url}/${app.withdraw}`}>
      <button className="uppercase hover:bg-angel-blue bg-thin-blue rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1">
        Withdraw
      </button>
    </NavLink>
  );
}
