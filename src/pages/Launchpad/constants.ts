import { Progress } from "slices/launchpad/types";

export const routes: { [K in Exclude<Progress, 1>]: `${K}` } = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7", // complete
};
