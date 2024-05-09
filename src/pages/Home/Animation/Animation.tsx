import AnimatedSVG from "./AnimatedSVG";
import MobileAnimation from "./MobileAnimation";

const Animation = () => {
  return (
    <>
      <AnimatedSVG classes="max-lg:hidden pt-24" />
      <MobileAnimation classes="lg:hidden" />
    </>
  );
};

export default Animation;
