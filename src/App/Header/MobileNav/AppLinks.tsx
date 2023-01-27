import { NavLink } from "react-router-dom";
import { appRoutes } from "constants/routes";
import { styler } from "./helpers";

export default function AppLinks() {
  return (
    <div className="grid justify-items-start content-start uppercase font-extrabold font-heading">
      <NavLink to={appRoutes.index} className={styler} end>
        Marketplace
      </NavLink>
      <NavLink to={appRoutes.leaderboard} className={styler}>
        Leaderboard
      </NavLink>
      <NavLink to={appRoutes.register} className={styler}>
        Register
      </NavLink>
    </div>
  );
}
