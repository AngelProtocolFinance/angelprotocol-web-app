import MobileAnimation from "./MobileAnimation";
import { AnimatedSVG } from "./animated-svg";

const Animation = () => {
  return (
    <>
      <AnimatedSVG classes="max-lg:hidden pt-56" />
      <MobileAnimation classes="lg:hidden" />
    </>
  );
};

export default Animation;
