import { useLocation } from "@remix-run/react";
import { DappLogo } from "components/image";
import { authRoutes } from "constants/routes";

import { NavDropdown, UserMenu } from "components/header";
import { useRootData } from "hooks/use-root-data";

type Props = { classes?: string };

export default function Header({ classes }: Props) {
  const location = useLocation();
  const isInAuth = authRoutes.includes(location.pathname);
  const user = useRootData();

  return (
    <header
      className={`${classes} bg-white grid grid-cols-[1fr_auto_auto] items-center gap-4 pr-6 py-2 border-b border-gray-l4`}
      ref={(node) => {
        if (!node) return;
        const observer = new IntersectionObserver(
          ([e]) => {
            const isIntersecting = e.intersectionRatio < 1;
            e.target.classList.toggle("shadow-lg", isIntersecting);
          },
          { threshold: [1] }
        );
        observer.observe(node);
      }}
    >
      <DappLogo classes="w-48 h-12" />
      {!isInAuth && <UserMenu classes="max-sm:hidden" />}
      <NavDropdown isInAuth={isInAuth} user={user} />
    </header>
  );
}
