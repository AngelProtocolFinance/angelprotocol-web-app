import { NavLink } from "react-router-dom";
import { appRoutes } from "constants/routes";
import ThemeToggle from "../../ThemeToggle";
import { commonNavItemStyle, navLinkStyle } from "../constants";

export default function Links() {
  return (
    <nav className="grid gap-4 w-full pt-4 font-extrabold font-heading">
      <NavLink to={appRoutes.index} className={navLinkStyle} end>
        Marketplace
      </NavLink>
      <NavLink to={appRoutes.leaderboard} className={navLinkStyle}>
        Leaderboard
      </NavLink>
      <NavLink to={appRoutes.register} className={navLinkStyle}>
        Register
      </NavLink>
      <span
        className={`flex justify-between items-center mt-4 ${commonNavItemStyle}`}
      >
        <span>Theme</span>
        <ThemeToggle classes="flex" />
      </span>
    </nav>
  );
}
