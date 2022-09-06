import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { templateRoutes as routes } from "../../constants";

const styler = createNavLinkStyler(
  "text-angel-grey px-4 py-1",
  "bg-angel-blue text-white-grey pointer-events-none"
);

export default function Nav() {
  return (
    <div className="bg-white-grey flex flex-col py-4 shadow-md rounded-md">
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

      <Category title="Endowment" classes="mt-4" />
      <NavLink to={routes.acc_endow_status} className={styler}>
        Change Endowment Status
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

function Category(props: { title: string; classes?: string }) {
  return (
    <h3 className={`px-4 font-bold text-angel-grey ${props.classes || ""}`}>
      {props.title}
    </h3>
  );
}
