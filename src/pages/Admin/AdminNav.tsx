import { admin } from "constants/routes";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import { NavLink } from "react-router-dom";

export default function AdminNav() {
  return (
    <div className="flex justify-end divide-x border-opacity-80">
      <NavLink end to={admin.index} className={styler}>
        proposals
      </NavLink>
      <NavLink to={admin.alliance} className={styler}>
        alliance members
      </NavLink>
      <NavLink to={admin.charity_applications} className={disabledStyle}>
        charity applications
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "px-2 uppercase text-sm text-center font-semibold font-heading text-white",
  "text-angel-orange"
);

const disabledStyle =
  "uppercase text-sm text-center px-2 font-semibold font-heading pointer-events-none select-none text-grey-accent";
