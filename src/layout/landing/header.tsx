import { AuthBtns, AuthLinks, NavDropdown } from "components/header";
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
      <div className="flex items-center gap-4 xl:container xl:mx-auto px-5 py-2">
        <div className="flex-1">
          <DappLogo classes="h-12" />
        </div>
        {!user && to && <AuthBtns to={to} classes="max-sm:hidden flex-none" />}
        <NavDropdown
          classes="flex-none"
          auth_links={to && !user && <AuthLinks to={to} classes="sm:hidden" />}
          user={user}
        />
      </div>
    </header>
  );
}
