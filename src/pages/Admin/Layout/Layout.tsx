import { useState } from "react";
import { Outlet } from "react-router-dom";
import { LayoutProps } from "./types";
import Icon from "components/Icon";
import useHandleScreenResize, { SCREEN_MD } from "hooks/useHandleScreenResize";
import Sidebar from "./Sidebar";

export default function Layout({ linkGroups }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  useHandleScreenResize(
    (screen, ref) => {
      const shouldOpen = screen >= SCREEN_MD;
      /** limit render to toggle */
      if (shouldOpen && !ref.isOpen) {
        setIsOpen(shouldOpen);
        ref.isOpen = shouldOpen;
      } else if (!shouldOpen && ref.isOpen) {
        setIsOpen(shouldOpen);
        ref.isOpen = shouldOpen;
      }
    },
    {
      shouldAttachListener: true,
      shouldCallOnResizeOnLoad: true,
      ref: { isOpen },
    }
  );

  return (
    <div className={`grid md:grid-cols-[auto_1fr] md:divide-x md:divide-prim`}>
      {/** sidebar opener */}
      <button
        aria-hidden={isOpen}
        className="md:hidden aria-hidden:hidden px-6 py-5 border-b border-prim flex justify-between items-center"
        onClick={() => setIsOpen(true)}
      >
        <span>Active route</span>
        <Icon type="Forward" />
      </button>
      {/** sidebar */}
      <Sidebar linkGroups={linkGroups} />

      {/** views */}
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}
