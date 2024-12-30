import React, { type ReactNode } from "react";
import { NavLink } from "react-router";
import type { LinkGroup } from "./types";

type Props = {
  className?: string;
  linkGroups: LinkGroup[];
  sidebarHeader?: ReactNode;
  onChange?: () => void;
};

export default function Sidebar({
  className = "",
  linkGroups,
  onChange,
  sidebarHeader,
}: Props) {
  return (
    <div
      className={`flex flex-col w-72 md:w-64 h-full bg-white dark:bg-blue-d6 border-r border-gray-l4 ${className}`}
    >
      {sidebarHeader}
      <div className="grid grid-cols-[auto_1fr] py-3 gap-x-2">
        {linkGroups.map((group) => (
          <React.Fragment key={`link_group-${group.title}`}>
            {group.title && (
              <h6 className="col-span-2 pt-5 px-5 pb-1 font-bold text-xs uppercase text-navy-l3 tracking-wide">
                {group.title}
              </h6>
            )}
            {group.links.map((link) => (
              <NavLink
                end={link.end}
                key={`nav_link-${link.to}`}
                to={link.to}
                className={({ isActive, isPending }) =>
                  `grid grid-cols-subgrid col-span-2 items-center py-3 px-5 font-bold text-sm hover:text-blue-d1 transition ease-in-out duration-300 aria-disabled:text-navy-l2 aria-disabled:pointer-events-none 
                ${isActive ? "pointer-events-none text-blue-d1" : ""} ${isPending ? "pointer-events-none text-gray" : ""}`
                }
                onClick={onChange}
                aria-disabled={link.disabled}
              >
                <link.icon.fn className="justify-self-center" />
                {link.title}
              </NavLink>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
