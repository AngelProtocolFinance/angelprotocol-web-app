import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSetter } from "store/accessors";
import { setIsMobileNavOpen } from "slices/components/mobileNav";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";
import ThemeToggle from "../ThemeToggle";

export default function AppLinks() {
  const dispatch = useSetter();
  useEffect(() => {
    //set open state after portal node has been mounted
    dispatch(setIsMobileNavOpen(true));

    return () => {
      dispatch(setIsMobileNavOpen(false));
    };
  }, [dispatch]);

  return (
    <div className="padded-container grid col-span-3 w-full justify-items-start content-start font-extrabold font-heading ">
      <NavLink to={appRoutes.index} className={styler} end>
        Marketplace
      </NavLink>
      <NavLink to={appRoutes.leaderboard} className={styler}>
        Leaderboard
      </NavLink>
      {/*<NavLink to={appRoutes.register} className={styler}>
            Register
          </NavLink>*/}
      <span
        className={`flex justify-between items-center ${commonNavItemStyle}`}
      >
        <span>Theme</span>
        <ThemeToggle />
      </span>
    </div>
  );
}

const commonNavItemStyle =
  "text-white-grey font-heading font-semibold mb-4 w-full text-2xl";

const styler = createNavLinkStyler(
  `${commonNavItemStyle} hover:text-white-grey/75`,
  "text-angel-orange"
);
