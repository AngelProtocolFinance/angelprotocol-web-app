import laira10 from "./laira-announce.webp";
import laira11 from "./laira-calling.webp";
import laira12 from "./laira-cheering.webp";
import laira13 from "./laira-coin.webp";
import laira14 from "./laira-gift.webp";
import laira15 from "./laira-giggling.webp";
import laira1 from "./laira-happy-jump.webp";
import laira16 from "./laira-heart.webp";
import laira8 from "./laira-laptop.webp";
import laira17 from "./laira-like.webp";
import laira7 from "./laira-negotiating.webp";
import laira18 from "./laira-note.webp";
import laira2 from "./laira-open-arms.webp";
import laira19 from "./laira-pointing.webp";
import laira9 from "./laira-presentation.webp";
import laira3 from "./laira-sitting.webp";
import laira22 from "./laira-standing-front.webp";
import laira4 from "./laira-standing.webp";
import laira20 from "./laira-trophy.webp";
import laira5 from "./laira-waiving.webp";
import laira6 from "./laira-walking.webp";
import laira21 from "./laira-yellow.webp";

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
