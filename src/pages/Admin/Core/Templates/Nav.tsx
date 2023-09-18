import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { templateRoutes as routes } from "../../constants";

const styler = createNavLinkStyler(
  "px-4 py-1 text-gray-d1 dark:text-gray-l3",
  "bg-orange-l4 dark:bg-blue-d3 pointer-events-none"
);

export default function Nav() {
  return (
    <div className="bg-white dark:bg-blue-d6 border border-gray-l3 dark:border-bluegray flex flex-col py-4 rounded">
      <Category title="Admin" />
      <NavLink to={routes["multisig.fund-transfer"]} className={styler}>
        Fund transfer
      </NavLink>
      <Category title="Index fund" classes="mt-4" />
      <NavLink to={routes["index-fund.create-fund"]} className={styler}>
        Create Fund
      </NavLink>
      <NavLink to={routes["index-fund.remove-fund"]} className={styler}>
        Remove Fund
      </NavLink>
      <NavLink to={routes["index-fund.update-members"]} className={styler}>
        Update Fund Members
      </NavLink>
      <NavLink to={routes["index-fund.config"]} className={styler}>
        Update Config
      </NavLink>
      <Category title="Registrar" classes="mt-4" />
      <NavLink to={routes["registrar.update-config"]} className={styler}>
        Update Contract Addresses
      </NavLink>
      <NavLink to={routes["registrar.update-owner"]} className={styler}>
        Update Owner
      </NavLink>
      <NavLink to={routes["registrar.add-token"]} className={styler}>
        Add token
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
