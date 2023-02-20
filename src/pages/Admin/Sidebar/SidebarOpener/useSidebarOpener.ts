import { matchPath, useLocation } from "react-router-dom";
import { Link, LinkGroup } from "../types";
import { useModalContext } from "contexts/ModalContext";
import useHandleScreenResize, { SCREEN_MD } from "hooks/useHandleScreenResize";
import { appRoutes } from "constants/routes";
import ToggleableSidebar from "./ToggleableSidebar";

const ADMIN_ROUTE = `${appRoutes.admin}/:id/`;

const DEFAULT_LINK: Link = {
  title: "Open Menu",
  icon: { type: "Menu", size: 24 },
  to: "",
};

export default function useSidebarOpener(linkGroups: LinkGroup[]) {
  const currPath = useLocation().pathname;

  const activeLink = linkGroups
    .flatMap((g) => g.links)
    .find((link) => !!matchPath(`${ADMIN_ROUTE}${link.to}`, currPath));

  const { showModal, closeModal, isModalOpen } = useModalContext();

  useHandleScreenResize(
    (screenSize) => screenSize >= SCREEN_MD && closeModal(),
    50,
    {},
    { shouldAttachListener: isModalOpen }
  );

  const open = () => showModal(ToggleableSidebar, { linkGroups });

  return { open, activeLink: activeLink ?? DEFAULT_LINK };
}
