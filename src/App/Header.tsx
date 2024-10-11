import { DappLogo } from "components/Image";
import { authRoutes } from "constants/routes";
import { useLocation } from "react-router-dom";

import { NavDropdown, UserMenu } from "components/Header";

type Props = { classes?: string };

export default function Header({ classes }: Props) {
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
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 padded-container py-2">
        <DappLogo classes="w-48 h-12" />

        {!isInAuth && <UserMenu classes="max-sm:hidden" />}
        <NavDropdown isInAuth={isInAuth} />
      </div>
    </header>
  );
}
