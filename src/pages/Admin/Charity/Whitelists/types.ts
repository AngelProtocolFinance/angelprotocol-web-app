import { EndowmentSettingsUpdate } from "types/contracts";

export type WhiteLists = {
  contributors: string[];
  beneficiaries: string[];
};
export type FormValues = { initial: EndowmentSettingsUpdate } & WhiteLists;
