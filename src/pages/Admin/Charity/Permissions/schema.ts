import { SettingsPermissions } from "./types";

type FormField = Omit<SettingsPermissions, "delegate"> & {
  name: string;
  delegate: boolean;
  delegate_address?: string;
};

export type FormValues = {
  beneficiaries_allowlist: FormField;
  contributors_allowlist: FormField;
  liquidAccountStrategy: FormField;
  lockedAccountStrategy: FormField;
  profile: FormField;
};
