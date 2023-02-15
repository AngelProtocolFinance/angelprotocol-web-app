import { Dialog } from "@headlessui/react";
import React, { createElement } from "react";
import { NavLink } from "react-router-dom";
import { LayoutProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { createNavLinkStyler } from "helpers";
import { adminRoutes } from "constants/routes";

type Props = Pick<LayoutProps, "linkGroups"> & {
  classes?: string;
  inModal?: boolean;
};

export default function Sidebar({
  linkGroups,
  classes = "",
  inModal = false,
}: Props) {
  const { closeModal } = useModalContext();

  return createElement(inModal ? Dialog.Panel : "div", {
    className: `w-72 sm:w-64 h-full bg-white dark:bg-blue-d6 border-r border-prim ${classes}`,
    children: (
      <>
        <div>Header</div>
        <div className="flex flex-col py-3">
          {linkGroups.map((group) => (
            <React.Fragment key={`link_group-${group.title}`}>
              {group.title && (
                <h6 className="pt-5 px-5 pb-1 font-bold text-xs uppercase text-gray-l1 tracking-wide">
                  {group.title}
                </h6>
              )}
              {group.links.map((link) => {
                const { url, title } = adminRoutes[link];
                return (
                  <NavLink
                    key={`nav_link-${link}`}
                    to={url}
                    className={linkClassName}
                    onClick={inModal ? closeModal : undefined}
                    end={url === "" /** when route is index */}
                  >
                    <Icon type="Admin" />
                    {title}
                  </NavLink>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </>
    ),
  });
}

const linkClassName = createNavLinkStyler(
  "flex items-center gap-2 py-3 px-5 font-bold text-sm hover:text-orange-l1 active:text-orange",
  "pointer-events-none text-orange"
);
