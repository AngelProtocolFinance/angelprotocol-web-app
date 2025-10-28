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
      className={`${classes} bg-white flex items-center gap-4 pr-6 py-2 border-b border-gray-l3`}
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
      <div className="flex-1">
        <DappLogo classes="w-48 h-12" />
      </div>
      <NavDropdown
        classes="flex-none"
        auth_links={to && !user && <AuthLinks to={to} classes="sm:hidden" />}
        user={user}
      />
    </header>
  );
}
