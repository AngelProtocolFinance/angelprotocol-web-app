import lairaAnnounce from "./laira-announce.webp";
import lairaCalling from "./laira-calling.webp";
import lairaCheering from "./laira-cheering.webp";
import lairaCoin from "./laira-coin.webp";
import lairaGift from "./laira-gift.webp";
import lairaGiggling from "./laira-giggling.webp";
import lairaHappyJump from "./laira-happy-jump.webp";
import lairaHeart from "./laira-heart.webp";
import lairaLaptopFull from "./laira-laptop-full.webp";
import lairaLaptop from "./laira-laptop.webp";
import lairaLike from "./laira-like.webp";
import lairaNegotiating from "./laira-negotiating.webp";
import lairaNote from "./laira-note.webp";
import lairaOpenArms from "./laira-open-arms.webp";
import lairaPointing from "./laira-pointing.webp";
import lairaPresentation from "./laira-presentation.webp";
import lairaSitting from "./laira-sitting.webp";
import lairaStandingFront from "./laira-standing-front.webp";
import lairaStanding from "./laira-standing.webp";
import lairaTrophy from "./laira-trophy.webp";
import lairaWaiving from "./laira-waiving.webp";
import lairaWalking from "./laira-walking.webp";
import lairaYellow from "./laira-yellow.webp";

export const laira = {
  jumping: lairaHappyJump,
  openArms: lairaOpenArms,
  sitting: lairaSitting,
  standing: lairaStanding,
  standingFront: lairaStandingFront,
  waiving: lairaWaiving,
  walking: lairaWalking,
  negotiating: lairaNegotiating,
  laptop: lairaLaptop,
  laptopFull: lairaLaptopFull,
  presentation: lairaPresentation,
  announce: lairaAnnounce,
  calling: lairaCalling,
  cheering: lairaCheering,
  coin: lairaCoin,
  gift: lairaGift,
  giggling: lairaGiggling,
  heart: lairaHeart,
  like: lairaLike,
  note: lairaNote,
  pointing: lairaPointing,
  trophy: lairaTrophy,
  yellow: lairaYellow,
};

const lairas = Object.values(laira);
export const randomLaira = () =>
  lairas[Math.floor(Math.random() * lairas.length)];
