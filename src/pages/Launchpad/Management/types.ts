import { TManagement } from "slices/launchpad/types";

export type FV = {
  members: TManagement["members"];
  duration: string;
  threshold: string;
  isAutoExecute: boolean;
};
