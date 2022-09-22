import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSetter } from "store/accessors";
import { setIsMobileNavOpen } from "slices/components/mobileNav";
import { appRoutes } from "constants/routes";
import { styler } from "./helpers";

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
