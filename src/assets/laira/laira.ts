import laira1 from "./laira-happy-jump.png";
import laira2 from "./laira-open-arms.png";
import laira3 from "./laira-sitting.png";
import laira4 from "./laira-standing.png";
import laira5 from "./laira-waiving.png";
import laira6 from "./laira-walking.png";

export const laira = {
  jumping: laira1,
  openArms: laira2,
  sitting: laira3,
  standing: laira4,
  waiving: laira5,
  walking: laira6,
};

const lairas = Object.values(laira);
export const randomLaira = () =>
  lairas[Math.floor(Math.random() * lairas.length)];
