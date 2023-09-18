import { EndowmentSettingsUpdate } from "types/contracts";

export type FV = {
  willMature: boolean;
  date: string;
  initial: EndowmentSettingsUpdate;
};
