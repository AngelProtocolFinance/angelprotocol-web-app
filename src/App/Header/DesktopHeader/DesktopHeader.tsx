import { useLocation } from "react-router-dom";
import hero from "assets/images/hero.png";
import { useGetter } from "store/accessors";
import { appRoutes } from "constants/routes";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";
import WalletSuite from "../WalletSuite";
import Banner from "./Banner";
import NavLinks from "./NavLinks";

export default function DesktopHeader() {
  const { pathname } = useLocation();
  const isHome = pathname === appRoutes.index;

  const theme = useGetter((state) => state.theme);
  const color =
    theme === "dark" ? "rgba(30, 91, 134, 0.9)" : "rgba(84, 163, 217, 0.9)";
  const background = isHome
    ? `linear-gradient(${color}, ${color}), url('${hero}') center / cover no-repeat`
    : "";

  return (
    <div
      className="hidden lg:block w-full pt-2"
      style={{
        background,
      }}
    >
      <header className="grid grid-cols-[auto_1fr_auto] items-center w-full padded-container gap-5">
        <Logo />
        <NavLinks />
        <div className="flex gap-4">
          <ThemeToggle />
          <WalletSuite />
        </div>
      </header>
      {isHome && <Banner classes="my-10" />}
    </div>
  );
}
