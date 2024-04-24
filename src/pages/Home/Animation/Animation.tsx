import AnimatedSVG from "./AnimatedSVG";
import MobileAnimation from "./MobileAnimation";
import TabletAnimation from "./TabletAnimation";

const Animation = () => {
  return (
    <>
      <AnimatedSVG classes="max-lg:hidden" />
      <MobileAnimation classes="sm:hidden" />
      <TabletAnimation classes="hidden sm:max-lg:block" />
    </>
  );
};

export default Animation;
