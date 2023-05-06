import { Progress } from "slices/launchpad/types";

export const steps: {
  [K in Exclude<Progress, 1>]: { path: string; label: string };
} = {
  2: { path: "2", label: "Management" },
  3: { path: "3", label: "Whitelists" },
  4: { path: "4", label: "Maturity" },
  5: { path: "5", label: "Split of Contribution" },
  6: { path: "6", label: "Fees" },
  7: { path: "7", label: "Connect Wallet" }, // complete
  8: { path: "8", label: "Summary" },
};

export const allSteps: {
  [K in Progress]: { path: string; label: string };
} = { 1: { path: "1", label: "About" }, ...steps };

export const routes = {
  index: "",
  steps: "steps",
  success: "success",
};
