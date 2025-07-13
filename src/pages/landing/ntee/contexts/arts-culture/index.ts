import { APP_NAME } from "constants/env";
import type { PageContext } from "../../types";
import hero from "./hero.png";
import left from "./left.png";
import right from "./right.png";

export const arts_culture: PageContext = {
  copy: {
    1: "Zero platform fees. More ways to give.. More funding for your arts mission.",
    2: `${APP_NAME} helps arts and culture nonprofits save on fees and grow impact without compromise.`,
  },
  hero,
  left,
  right,
};
