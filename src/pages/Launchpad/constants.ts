import { Progress } from "slices/launchpad/types";

export const routes: { [K in Progress]: `${K}` } = {
  0: "0", // init
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7", // complete
};
