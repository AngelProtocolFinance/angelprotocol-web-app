import React from "react";
import { NavLink } from "react-router-dom";
import { Link, LinkGroup } from "../types";
import Icon from "components/Icon";
import { createNavLinkStyler } from "helpers";
import Header from "./Header";

type Props = {
  endowId: number;
  className?: string;
  linkGroups: LinkGroup[];
  onChange?: (link: Link) => void;
};

export default function Sidebar(props: Props) {
  return (
    <div
      className={`flex flex-col w-72 sm:w-64 h-full bg-white dark:bg-blue-d6 border-r border-prim ${props.className}`}
    >
      <Header endowId={props.endowId} />

      <div className="flex flex-col py-3">
        {props.linkGroups.map((group) => (
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
                onClick={() => props.onChange && props.onChange(link)}
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
  "flex items-center gap-2 py-3 px-5 font-bold text-sm hover:text-orange-l1 active:text-orange transition ease-in-out duration-300",
  "pointer-events-none text-orange"
);
