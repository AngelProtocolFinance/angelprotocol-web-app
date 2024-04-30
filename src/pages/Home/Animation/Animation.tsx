import AnimatedSVG from "./AnimatedSVG";
import MobileAnimation from "./MobileAnimation";
import TabletAnimation from "./TabletAnimation";

const Animation = () => {
  return (
    <>
      <AnimatedSVG classes="max-lg:hidden 2xl:pt-24" />
      <MobileAnimation classes="sm:hidden" />
      <TabletAnimation classes="hidden sm:max-lg:block" />
    </>
  );
};

export default Animation;
