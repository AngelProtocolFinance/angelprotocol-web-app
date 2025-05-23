import { useLocation } from "@remix-run/react";
import { NavDropdown, UserMenu } from "components/header";
import { DappLogo } from "components/image";
import { authRoutes } from "constants/routes";
import { useRootData } from "hooks/use-root-data";

type Props = { classes?: string };

export default function Header({ classes }: Props) {
  const user = useRootData();
  const location = useLocation();
  const isInAuth = authRoutes.includes(location.pathname);

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

        {!isInAuth && <UserMenu classes="max-sm:hidden" />}
        <NavDropdown isInAuth={isInAuth} user={user} />
      </div>
    </header>
  );
}
