import { matchPath, useLocation } from "react-router-dom";
import { LayoutProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import useHandleScreenResize, { SCREEN_MD } from "hooks/useHandleScreenResize";
import { adminRoutes } from "constants/routes";
import Sidebar from "./Sidebar";

type Props = Pick<LayoutProps, "linkGroups"> & { classes?: string };
export default function SidebarOpener({ classes = "", linkGroups }: Props) {
  const { closeModal, showModal, isModalOpen } = useModalContext();
  const location = useLocation();

  useHandleScreenResize(
    (screen) => {
      if (screen >= SCREEN_MD) {
        closeModal();
      }
    },
    {
      shouldAttachListener: isModalOpen,
    }
  );

  const link = linkGroups
    .flatMap((g) => g.links)
    .find((l) => {
      const route = adminRoutes[l];
      const match = matchPath(`admin/:id/${route.url}`, location.pathname);
      return match !== null;
    });

  const route = link && adminRoutes[link];

  return (
    <button
      aria-hidden={isModalOpen}
      className={`${classes} aria-hidden:hidden px-6 py-5 border-b border-prim flex justify-between items-center`}
      onClick={() =>
        showModal(Sidebar, {
          linkGroups,
          classes: "fixed top-0 left-0 z-20",
          inModal: true,
        })
      }
    >
      {route && <span>{route.title}</span>}
      <Icon type="Forward" />
    </button>
  );
}
