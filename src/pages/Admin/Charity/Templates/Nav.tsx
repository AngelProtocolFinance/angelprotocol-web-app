import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { templateRoutes as routes } from "../../constants";

const styler = createNavLinkStyler(
  "px-4 py-1 text-gray-d1 dark:text-gray-l3",
  "bg-orange-l4 dark:bg-blue-d3 pointer-events-none"
);

export default function Nav() {
  return (
    <div className="bg-white dark:bg-blue-d6 border border-prim flex flex-col py-4 rounded">
      <Category title="Admin" classes="mb-2" />
      <NavLink end to={routes["multisig.owners"]} className={styler}>
        Update group members
      </NavLink>
      <NavLink to={routes["multisig.config"]} className={styler}>
        Update voting params
      </NavLink>
      <NavLink to={routes["multisig.fund-transfer"]} className={styler}>
        Fund transfer
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
