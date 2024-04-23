import AnimatedSVG from "./AnimatedSVG";
import MobileAnimation from "./MobileAnimation";
import TabletAnimation from "./TabletAnimation";

const Animation = () => {
  return (
    <div className=" relative flex flex-col ">
      <AnimatedSVG />
      <MobileAnimation />
      <TabletAnimation />
    </div>
  );
};

export default Animation;
