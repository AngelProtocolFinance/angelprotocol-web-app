import { AuthLinks, NavDropdown, UserAvatar } from "components/header";
import { DappLogo } from "components/image";
import { auth_routes } from "constants/routes";
import { use_root_data } from "hooks/use-root-data";
import { useLocation } from "react-router";

type Props = { classes?: string };

export function Header({ classes }: Props) {
  const user = use_root_data();
  const { pathname: p, search: s } = useLocation();
  const to = auth_routes.includes(p) ? undefined : p + s;

  return (
    <header
      className={`${classes} bg-white grid grid-cols-[1fr_auto_auto] items-center gap-4 pr-6 py-2 border-b border-gray-l3`}
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
      <DappLogo classes="w-48 h-6" />
      {user && <UserAvatar avatar={user.avatar} classes="max-sm:hidden" />}
      <NavDropdown
        auth_links={to && !user && <AuthLinks to={to} classes="sm:hidden" />}
        user={user}
      />
    </header>
  );
}
