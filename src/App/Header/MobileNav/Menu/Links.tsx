import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSetter } from "store/accessors";
import { setIsRendered } from "slices/components/mobileNav";
import { BASE_DOMAIN } from "constants/common";
import { appRoutes } from "constants/routes";
import ThemeToggle from "../../ThemeToggle";
import { commonNavItemStyle, navLinkStyle, navStyle } from "../constants";

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
    <nav className="grid gap-4 w-full pt-4 font-extrabold font-heading">
      <a href={BASE_DOMAIN} className={navStyle}>
        For Non-Profits
      </a>
      <NavLink className={navLinkStyle} to={appRoutes.index}>
        Marketplace
      </NavLink>
      <a href={`${BASE_DOMAIN}/giving-partners-csr/`} className={navStyle}>
        Giving Partners
      </a>
      <a href={`${BASE_DOMAIN}/about-angel-giving/`} className={navStyle}>
        About
      </a>
      <NavLink className={navLinkStyle} to={appRoutes.register}>
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
