import laira10 from "./laira-announce.png";
import laira11 from "./laira-calling.png";
import laira12 from "./laira-cheering.png";
import laira13 from "./laira-coin.png";
import laira14 from "./laira-gift.png";
import laira15 from "./laira-giggling.png";
import laira1 from "./laira-happy-jump.png";
import laira16 from "./laira-heart.png";
import laira8 from "./laira-laptop.png";
import laira17 from "./laira-like.png";
import laira7 from "./laira-negotiating.png";
import laira18 from "./laira-note.png";
import laira2 from "./laira-open-arms.png";
import laira19 from "./laira-pointing.png";
import laira9 from "./laira-presentation.png";
import laira3 from "./laira-sitting.png";
import laira22 from "./laira-standing-front.png";
import laira4 from "./laira-standing.png";
import laira20 from "./laira-trophy.png";
import laira5 from "./laira-waiving.png";
import laira6 from "./laira-walking.png";
import laira21 from "./laira-yellow.png";

export const laira = {
  jumping: laira1,
  openArms: laira2,
  sitting: laira3,
  standing: laira4,
  standingFront: laira22,
  waiving: laira5,
  walking: laira6,
  negotiating: laira7,
  laptop: laira8,
  presentation: laira9,
  announce: laira10,
  calling: laira11,
  cheering: laira12,
  coin: laira13,
  gift: laira14,
  giggling: laira15,
  heart: laira16,
  like: laira17,
  note: laira18,
  pointing: laira19,
  trophy: laira20,
  yellow: laira21,
};

const lairas = Object.values(laira);
export const randomLaira = () =>
  lairas[Math.floor(Math.random() * lairas.length)];
