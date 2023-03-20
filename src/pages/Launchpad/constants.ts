import { Progress } from "slices/launchpad/types";

export const steps: { [K in Exclude<Progress, 1>]: `${K}` } = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7", // complete
};

export const routes = {
  index: "",
  steps: "steps",
  success: "success",
  new: "new",
};
