import { NavLink, useRouteMatch } from "react-router-dom";
import { app } from "types/routes";
export default function Nav() {
  const { url } = useRouteMatch();
  const linkStyles =
    "uppercase text-lg text-white-grey py-1 p-5 text-center rounded-sm border-t border-b border-opacity-20";
  const activeStyles = "bg-white bg-opacity-20";
  return (
    <div className="padded-container flex mt-5 mb-1 font-heading">
      <NavLink
        activeClassName={activeStyles}
        className={linkStyles}
        to={`${url}`}
        exact
      >
        Charities
      </NavLink>
      <NavLink
        activeClassName={activeStyles}
        className={linkStyles}
        to={`${url}/${app.board_tca}`}
      >
        Angel Alliance
      </NavLink>
    </div>
  );
}
