import { useLocation } from "react-router-dom";
import hero from "assets/images/hero.png";
import { useGetter } from "store/accessors";
import { appRoutes } from "constants/routes";
import WalletSuite from "../../WalletSuite";
import Floater from "../Floater";
import Logo from "../Logo";
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
      className="lg:hidden w-full"
      style={{
        background,
      }}
    >
      <Floater>
        <header className="flex justify-between items-center w-full padded-container">
          <Logo />
          <div className="flex justify-end gap-3">
            <WalletSuite />
            <MenuButton />
          </div>
        </header>
      </Floater>
      {isHome && <Banner classes="mt-32" />}
    </div>
  );
}
