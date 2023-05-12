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
      <Category title="Admin" />
      <NavLink end to={routes["multisig.owners"]} className={styler}>
        Update group members
      </NavLink>
      <NavLink to={routes["multisig.config"]} className={styler}>
        Update voting params
      </NavLink>
      <NavLink to={routes["multisig.fund-transfer"]} className={styler}>
        Fund transfer
      </NavLink>

      <Category title="Index fund" classes="mt-4" />
      <NavLink
        to={routes["index-fund.update-alliance-list"]}
        className={styler}
      >
        Edit Alliance List
      </NavLink>
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
      <NavLink to={routes["index-fund.update-owner"]} className={styler}>
        Update Owner
      </NavLink>

      <Category title="Registrar" classes="mt-4" />
      <NavLink to={routes["registrar.update-config"]} className={styler}>
        Contracts & WASM codes
      </NavLink>
      <NavLink to={routes["registrar.update-owner"]} className={styler}>
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
