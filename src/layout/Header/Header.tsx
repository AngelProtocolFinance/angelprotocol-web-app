import { useHeaderColors } from "contexts/HeaderColorProvider";
import LeftBox from "./LeftBox";
import MiddleBox from "./MiddleBox";
import RightBox from "./RightBox";
import useScrollShadow from "./useScrollShadow";

export default function Header() {
  const { bgColor } = useHeaderColors();
  const shadowRef = useScrollShadow();

  return (
    <header
      ref={shadowRef}
      className={`grid fixed w-full bg-${bgColor} h-24 z-10 transition-shadow `}
    >
      <nav className="xl:container xl:mx-auto w-full grid grid-cols-a1a items-center justify-items-end md:justify-items-center px-5">
        <LeftBox />
        <MiddleBox />
        <RightBox />
      </nav>
    </header>
  );
}
