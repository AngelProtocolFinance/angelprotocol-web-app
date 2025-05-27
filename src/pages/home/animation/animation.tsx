import { AnimatedSVG } from "./animated-svg";
import MobileAnimation from "./mobile-animation";

export const Animation = () => {
  return (
    <>
      <AnimatedSVG classes="max-lg:hidden pt-56" />
      <MobileAnimation classes="lg:hidden" />
    </>
  );
};
