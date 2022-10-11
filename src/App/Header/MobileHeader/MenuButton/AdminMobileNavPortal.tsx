import { useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { useGetter } from "store/accessors";
import { adminRoutes, appRoutes } from "constants/routes";
import {
  adminMobileNavId,
  commonNavItemStyle,
  navLinkStyle,
} from "./constants";

export default function AdminMobileNavPortal({ id }: { id: number }) {
  const { isMobileNavOpen } = useGetter((state) => state.component.mobileNav);

  const containerElement = document.querySelector(`#${adminMobileNavId}`);

  useEffect(() => {
    containerElement?.parentElement?.classList.add("sm:grid-cols-2");
  }, [containerElement?.parentElement?.classList]);

  return (
    (isMobileNavOpen &&
      !!containerElement &&
      createPortal(
        <div className="border-t sm:border-t-0 sm:border-l border-white/20 padded-container">
          <h4
            className={`${commonNavItemStyle} mt-6 sm:mt-0 mb-6 uppercase font-extrabold`}
          >
            Admin
          </h4>
          <div className="grid justify-items-start font-heading">
            <NavLink
              end
              to={`${appRoutes.admin}/${id}`}
              className={navLinkStyle}
            >
              Dashboard
            </NavLink>
            <NavLink
              end
              to={`${appRoutes.admin}/${id}/${adminRoutes.withdraws}`}
              className={navLinkStyle}
            >
              Withdraws
            </NavLink>
            <NavLink
              end
              to={`${appRoutes.admin}/${id}/${adminRoutes.edit_profile}`}
              className={navLinkStyle}
            >
              Edit Profile
            </NavLink>
            <NavLink
              end
              to={`${appRoutes.admin}/${id}/${adminRoutes.proposals}`}
              className={navLinkStyle}
            >
              Proposals
            </NavLink>
          </div>
        </div>,
        containerElement
      )) ||
    null
  );
}
