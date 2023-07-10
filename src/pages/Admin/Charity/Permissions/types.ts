import { Delegate, SettingsControllerUpdate } from "types/contracts";

export type TPermission = Pick<Delegate, "addr"> & {
  delegated: boolean;
  locked: boolean;

  //meta
  modifiable: boolean;
  ownerControlled: boolean;
  govControlled: boolean;
};

export type TPermissions = {
  accountFees: TPermission;
  allowList: TPermission;
  donationSplitParams: TPermission;
  profile: TPermission;
};

export type FV = TPermissions & {
  initial: SettingsControllerUpdate;
};
