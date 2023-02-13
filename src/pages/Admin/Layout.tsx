import { PropsWithChildren, useState } from "react";
import { Outlet } from "react-router-dom";
import Icon from "components/Icon";
import useHandleScreenResize, { SCREEN_MD } from "hooks/useHandleScreenResize";

export default function Layout({ children }: PropsWithChildren<{}>) {
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
      <div
        aria-hidden={!isOpen}
        className="max-md:fixed max-md:z-20 max-md:inset-0 max-md:bg-black/60 aria-hidden:hidden grid grid-cols-[auto_1fr]"
      >
        <div className="bg-white dark:bg-blue-d6">{children}</div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        />
      </div>

      {/** views */}
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}
