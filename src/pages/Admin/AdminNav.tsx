import { admin } from "constants/routes";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import { NavLink } from "react-router-dom";

export default function AdminNav() {
  return (
    <div className="bg-white bg-opacity-10 shadow-inner flex divide-x">
      <NavLink to={admin.index} className={styler}>
        proposals
      </NavLink>
      <NavLink to={admin.alliance} className={styler}>
        alliance members
      </NavLink>
      <NavLink
        to={admin.charity_applications}
        className="py-1 uppercase text-sm text-center px-2 font-semibold font-heading text-white text-opacity-80 pointer-events-none cursor-none bg-grey-accent  bg-opacity-60 text-grey-accent"
      >
        charity applications
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "py-1 uppercase text-sm text-center px-2 font-semibold font-heading text-white text-opacity-80",
  "bg-white text-angel-grey"
);
