import { Delegate, SettingsControllerUpdate } from "types/contracts";

export type TPermission = Pick<Delegate, "addr"> & {
  delegated: boolean;
  locked: boolean;
  expires: boolean;
  expiry: string; //date string

  //meta
  modifiable: boolean;
  ownerControlled: boolean;
  govControlled: boolean;
};

export type TPermissions = {
  accountFees: TPermission;
  contributorAllowlist: TPermission;
  beneficiaryAllowlist: TPermission;
  maturityAllowlist: TPermission;
  maturityTime: TPermission;
  donationSplitParams: TPermission;
  profile: TPermission;
};

export type FV = TPermissions & {
  initial: SettingsControllerUpdate;
};
