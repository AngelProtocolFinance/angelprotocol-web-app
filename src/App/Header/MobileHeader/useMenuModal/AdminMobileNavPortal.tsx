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

  return (
    (isMobileNavOpen &&
      createPortal(
        <div className="border-t border-white-grey/20 padded-container">
          <h4 className={`${commonNavItemStyle} mb-6 uppercase font-extrabold`}>
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
        document.querySelector(`#${adminMobileNavId}`)!
      )) ||
    null
  );
}
