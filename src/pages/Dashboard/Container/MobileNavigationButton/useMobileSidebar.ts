import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, LinkGroup } from "../../types";
import { useModalContext } from "contexts/ModalContext";
import { useProfileContext } from "contexts/ProfileContext";
import { UnexpectedStateError } from "errors/errors";
import MobileSidebar from "./MobileSidebar";

export default function useMobileSidebar(linkGroups: LinkGroup[]) {
  const location = useLocation();

  const [activeLink, setActiveLink] = useState<Link>(() => {
    for (const group of linkGroups) {
      for (const link of group.links) {
        if (link.to === location.pathname) {
          return link;
        }
      }
    }
    throw new UnexpectedStateError(
      `No link matches current path ${location.pathname}`
    );
  });

  const { showModal } = useModalContext();
  const profile = useProfileContext();

  const open = () =>
    showModal(MobileSidebar, {
      linkGroups,
      adminResources: profile,
      onChange: (link) => setActiveLink(link),
    });

  return { open, activeLink };
}
