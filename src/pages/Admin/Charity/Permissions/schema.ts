import { SettingsPermissions } from "./types";

type FormField = Omit<SettingsPermissions, "delegate"> & {
  name: string;
  delegate: boolean;
  delegate_address?: string;
};

export type FormValues = {
  accountFees: FormField;
  beneficiaries_allowlist: FormField;
  contributors_allowlist: FormField;
  donationSplitParams: FormField;
  liquidAccountStrategy: FormField;
  lockedAccountStrategy: FormField;
  profile: FormField;
};
