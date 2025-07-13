import { APP_NAME } from "constants/env";
import type { PageContext } from "../../types";
import hero from "./hero.png";
import left from "./left.png";
import right from "./right.png";

export const arts_culture: PageContext = {
  copy: {
    1: "Zero platform fees. More ways to give. More funding for your environmental mission",
    2: `${APP_NAME} partners with environmental nonprofits to protect what can’t speak for itself forests, oceans, ecosystems.`,
  },
  hero,
  left,
  right,
};
