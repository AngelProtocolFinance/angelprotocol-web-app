import { useLocation } from "@remix-run/react";
import {
  AuthBtns,
  AuthLinks,
  NavDropdown,
  UserAvatar,
} from "components/header";
import { DappLogo } from "components/image";
import { authRoutes } from "constants/routes";
import { useRootData } from "hooks/use-root-data";

type Props = { classes?: string };

export function Header({ classes }: Props) {
  const user = useRootData();
  const { pathname: p, search: s } = useLocation();
  const to = authRoutes.includes(p) ? undefined : p + s;

  return (
    <header
      className={`${classes} bg-white`}
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
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 xl:container xl:mx-auto px-5 py-2">
        <DappLogo classes="h-12" />
        {user && <UserAvatar avatar={user.avatar} classes="max-sm:hidden" />}
        {!user && to && <AuthBtns to={to} classes="max-sm:hidden" />}
        <NavDropdown
          auth_links={to && !user && <AuthLinks to={to} classes="sm:hidden" />}
          user={user}
        />
      </div>
    </header>
  );
}
