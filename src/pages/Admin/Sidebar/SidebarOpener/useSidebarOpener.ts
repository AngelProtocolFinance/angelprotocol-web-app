import { appRoutes } from "constants/routes";
import { useModalContext } from "contexts/ModalContext";
import useHandleScreenResize, { SCREEN_MD } from "hooks/useHandleScreenResize";
import { matchPath, useLocation } from "react-router-dom";
import { Link, LinkGroup } from "../types";
import ToggleableSidebar from "./ToggleableSidebar";

const ADMIN_ROUTE = `${appRoutes.admin}/:id/`;

const DEFAULT_LINK: Link = {
  title: "Open Menu",
  icon: { type: "Menu", size: 24 },
  to: "",
};

export default function useSidebarOpener(linkGroups: LinkGroup[]) {
  const currPath = useLocation().pathname;

  // Explanation for the `reduce()` part:
  // Since `matchPath` returns all paths that match the pattern and that
  // includes all the parent paths, but we want to return only the "first parent" link
  // (the one with more path segments), we can find that "first parent" by simply checking the
  // `to` field length -> higher the length, more "recent" the parrent
  const activeLink = linkGroups
    .flatMap((g) => g.links)
    .reduce((prev, curr) => {
      const match = matchPath(`${ADMIN_ROUTE}${curr.to}/*`, currPath);

      if (!match || prev.to.length > curr.to.length) {
        return prev;
      }

      return curr;
    }, DEFAULT_LINK);

  const { showModal, closeModal, isModalOpen } = useModalContext();

  useHandleScreenResize(
    (screenSize) => screenSize >= SCREEN_MD && closeModal(),
    {
      debounceTime: 50,
      shouldAttachListener: isModalOpen,
    }
  );

  const open = () => showModal(ToggleableSidebar, { linkGroups });

  return { open, activeLink };
}
