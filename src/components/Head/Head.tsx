import { Link } from "react-router-dom";
import Logo from "components/Logo/Logo";
import useScrollShadow from "./useScrollShadow";
import { useHeaderColors } from "contexts/HeaderColorProvider";
import Wallet from "components/Wallet/Wallet";
import NavMenu from "components/Layout/NavMenu";

const Head = () => {
  const shadowRef = useScrollShadow();
  const { bgColor } = useHeaderColors();

  return (
    <header
      ref={shadowRef}
      className={`grid fixed w-full ${bgColor} h-24 z-10 transition-shadow`}
    >
      <nav className="container mx-auto grid grid-cols-nav items-center justify-items-center px-5">
        <Link to="/">
          <Logo />
        </Link>
        <NavMenu />
        <Wallet />
      </nav>
    </header>
  );
};

export default Head;
