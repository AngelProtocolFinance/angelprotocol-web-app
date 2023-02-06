import React from "react";
import { NavLink } from "react-router-dom";
import { LinkGroup } from "./types";
import Icon from "components/Icon";
import Logo from "components/Logo";
import { createNavLinkStyler } from "helpers";

type Props = { linkGroups: LinkGroup[] };

export default function Sidebar({ linkGroups }: Props) {
  return (
    <div className="flex flex-col w-64 h-full bg-white dark:bg-blue-d6 border-r border-prim">
      <div className="flex flex-col gap-3 w-full py-6 px-5 border-b border-prim">
        <div className="flex justify-between">
          <Logo className="w-14 h-14" />
          <button
            type="button"
            className="btn-outline gap-2 normal-case h-10 pr-4 pl-3"
          >
            <Icon type="Sync" />
            Switch
          </button>
        </div>

        <div className="grid gap-1">
          <h5 className="text-sm font-bold truncate">Endowment Name</h5>
          <span className="text-xs truncate">
            juno1rhaasmvq6t3a607ua90ufrr8srkr08lxauqnpz
          </span>
        </div>
      </div>

      <div className="flex flex-col py-3">
        {linkGroups.map((group) => (
          <React.Fragment key={`link_group-${group.title}`}>
            {group.title && (
              <h6 className="pt-5 px-5 pb-1 font-bold text-xs uppercase text-gray-l1 tracking-wide">
                {group.title}
              </h6>
            )}
            {group.links.map((link) => (
              <NavLink
                key={`nav_link-${link.to}`}
                to={link.to}
                className={linkClassName}
              >
                <Icon type={link.icon} size={24} />
                {link.title}
              </NavLink>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const linkClassName = createNavLinkStyler(
  "flex items-center gap-2 py-3 px-5 font-bold text-sm hover:text-orange-l1 active:text-orange transition ease-in-out duration-300",
  "pointer-events-none text-orange"
);
