import { admin } from "constants/routes";
import { useRouteMatch, NavLinkProps, NavLink } from "react-router-dom";

export default function AdminNav() {
  const { url } = useRouteMatch();
  const linkStyles: Pick<NavLinkProps, "activeClassName" | "className"> = {
    className:
      "py-1 uppercase text-sm text-center px-2 font-semibold font-heading text-white text-opacity-80",
    activeClassName: "bg-white text-angel-grey",
  };

  return (
    <div className="bg-white bg-opacity-10 shadow-inner flex divide-x">
      <NavLink exact to={`${url}/${admin.index}`} {...linkStyles}>
        proposals
      </NavLink>
      <NavLink to={`${url}/${admin.alliance}`} {...linkStyles}>
        alliance members
      </NavLink>
      <NavLink
        to={`${url}/${admin.charity_applications}`}
        className={
          linkStyles.className +
          " pointer-events-none cursor-none bg-grey-accent  bg-opacity-60 text-grey-accent"
        }
      >
        charity applications
      </NavLink>
    </div>
  );
}
