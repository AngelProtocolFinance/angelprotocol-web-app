import { SettingsPermissions } from "types/contracts";

export type FormField = Omit<SettingsPermissions, "delegate"> & {
  name: string;
} & (
    | { delegate: true; delegate_address: string }
    | { delegate: false; delegate_address: undefined }
  );

export type FormValues = {
  accountFees: FormField;
  beneficiaries_allowlist: FormField;
  contributors_allowlist: FormField;
  donationSplitParams: FormField;
  profile: FormField;
};
