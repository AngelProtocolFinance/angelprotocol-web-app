import { Route, Routes, useLocation } from "react-router-dom";
import hero from "assets/images/hero.png";
import { useGetter } from "store/accessors";
import { appRoutes } from "constants/routes";
import Logo from "../Logo";
import WalletSuite from "../WalletSuite";
import Banner from "./Banner";
import MenuButton from "./MenuButton";

export default function MobileHeader() {
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
      className="lg:hidden w-full pt-2"
      style={{
        background,
      }}
    >
      <header className="flex justify-between items-center w-full padded-container py-3">
        <Logo />
        <div className="flex justify-end gap-3">
          <WalletSuite />
          <MenuButton />
        </div>
      </header>
      <Routes>
        <Route path={appRoutes.index} element={<Banner classes="mt-10" />} />
      </Routes>
    </div>
  );
}
