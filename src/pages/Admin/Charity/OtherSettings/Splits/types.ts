import { Splits } from "types/ast";
import { EndowmentSettingsUpdate } from "types/contracts";

export type FV = Splits & {
  defaultMin: string;
  initial: EndowmentSettingsUpdate;
};
