import { matchPath, useLocation } from "react-router-dom";
import { Link, LinkGroup } from "./types";
import { useModalContext } from "contexts/ModalContext";
import { appRoutes } from "constants/routes";
import Sidebar from "./Sidebar";

const ADMIN_ROUTE = `${appRoutes.admin}/:id/`;

const DEFAULT_LINK: Link = {
  title: "Open Menu",
  icon: { type: "Menu", size: 24 },
  to: "",
};

export default function useMobileSidebar(linkGroups: LinkGroup[]) {
  const currPath = useLocation().pathname;

  const activeLink = linkGroups
    .flatMap((g) => g.links)
    .find((link) => !!matchPath(`${ADMIN_ROUTE}${link}`, currPath));

  const { showModal } = useModalContext();

  const open = () =>
    showModal(Sidebar, {
      linkGroups,
      className:
        "fixed top-0 left-0 z-20 max-h-screen overflow-y-auto scroller",
    });

  return { open, activeLink: activeLink ?? DEFAULT_LINK };
}
