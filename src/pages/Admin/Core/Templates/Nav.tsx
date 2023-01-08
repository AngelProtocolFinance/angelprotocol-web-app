import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { templateRoutes as routes } from "../../constants";

const styler = createNavLinkStyler(
  "px-4 py-1 text-gray-d1 dark:text-gray-l2",
  "bg-orange-l4 dark:bg-blue-d3 pointer-events-none"
);

export default function Nav() {
  return (
    <div className="bg-white dark:bg-blue-d6 border border-gray-l2 dark:border-bluegray flex flex-col py-4 rounded">
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

      <Category title="Index fund" classes="mt-4" />
      <NavLink to={routes.if_alliance} className={styler}>
        Edit Alliance List
      </NavLink>
      <NavLink to={routes.if_create} className={styler}>
        Create Fund
      </NavLink>
      <NavLink to={routes.if_remove} className={styler}>
        Remove Fund
      </NavLink>
      <NavLink to={routes.if_members} className={styler}>
        Update Fund Members
      </NavLink>
      <NavLink to={routes.if_config} className={styler}>
        Update Config
      </NavLink>
      <NavLink to={routes.if_owner} className={styler}>
        Update Owner
      </NavLink>

      <Category title="Registrar" classes="mt-4" />
      <NavLink to={routes.reg_config} className={styler}>
        Update Config
      </NavLink>
      <NavLink to={routes.reg_owner} className={styler}>
        Update Owner
      </NavLink>
    </div>
  );
}

function Category({
  classes = "",
  title,
}: {
  title: string;
  classes?: string;
}) {
  return <h3 className={`px-4 font-bold ${classes}`}>{title}</h3>;
}
