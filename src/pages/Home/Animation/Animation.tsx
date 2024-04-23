import TabletAnimation from "./TabletAnimation";
import AnimatedSVG from "./AnimatedSVG";
import MobileAnimation from "./MobileAnimation";

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
