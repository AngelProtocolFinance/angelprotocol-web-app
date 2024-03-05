import Icon from "components/Icon";
import { createNavLinkStyler } from "helpers";
import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import { LinkGroup } from "./types";

type Props = {
  className?: string;
  linkGroups: LinkGroup[];
  onChange?: () => void;
};

export default function Sidebar({
  className = "",
  linkGroups,
  onChange = () => {},
}: Props) {
  return (
    <div
      className={`flex flex-col w-72 md:w-64 h-full bg-white dark:bg-blue-d6 border-r border-gray-l4 ${className}`}
    >
      <Header />

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
                end={link.end}
                key={`nav_link-${link.to}`}
                to={link.to}
                className={linkClassName}
                onClick={onChange}
                aria-disabled={link.disabled}
              >
                <Icon {...link.icon} />
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
  "flex items-center gap-2 py-3 px-5 font-bold text-sm hover:text-orange-l1 active:text-orange transition ease-in-out duration-300 aria-disabled:text-navy-l2 aria-disabled:pointer-events-none",
  "pointer-events-none text-orange"
);
