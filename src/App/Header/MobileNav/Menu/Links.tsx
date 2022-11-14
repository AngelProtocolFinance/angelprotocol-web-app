import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSetter } from "store/accessors";
import { setIsRendered } from "slices/components/mobileNav";
import { appRoutes } from "constants/routes";
import ThemeToggle from "../../ThemeToggle";
import { commonNavItemStyle, navLinkStyle } from "../constants";

export default function Links() {
  const dispatch = useSetter();
  useEffect(() => {
    //set open state after portal node has been mounted
    dispatch(setIsRendered(true));

    return () => {
      dispatch(setIsRendered(false));
    };
  }, [dispatch]);

  return (
    <nav className="grid gap-4 w-full py-4 font-extrabold font-heading">
      <NavLink to={appRoutes.index} className={navLinkStyle} end>
        Home
      </NavLink>
      <NavLink to={appRoutes.marketplace} className={navLinkStyle}>
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
