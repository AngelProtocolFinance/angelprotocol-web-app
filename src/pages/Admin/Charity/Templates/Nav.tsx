import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { templateRoutes as routes } from "../../constants";

const styler = createNavLinkStyler(
  "text-gray-d2 px-4 py-1",
  "bg-blue text-white pointer-events-none"
);

export default function Nav() {
  return (
    <div className="bg-white flex flex-col py-4 shadow-md rounded-md">
      <Category title="Admin" />
      <NavLink end to={routes.cw4_members} className={styler}>
        Update group members
      </NavLink>
      <NavLink to={routes.cw3_config} className={styler}>
        Update voting params
      </NavLink>
      <NavLink to={routes.cw3_transfer} className={styler}>
        Fund transfer
      </NavLink>
    </div>
  );
}

function Category(props: { title: string; classes?: string }) {
  return (
    <h3 className={`px-4 font-bold text-gray-d2 ${props.classes || ""}`}>
      {props.title}
    </h3>
  );
}
