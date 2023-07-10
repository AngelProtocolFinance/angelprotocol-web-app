import { TPermission } from "../types";
import { SettingsPermission } from "types/contracts";
import { ADDRESS_ZERO } from "constants/evm";

export const formPermission = (setting: SettingsPermission): TPermission => {
  const delegate = setting.delegate;
  const isDelegated = delegate.addr !== ADDRESS_ZERO;
  return {
    delegated: isDelegated,
    addr: isDelegated ? delegate.addr : "",
    locked: setting.locked,

    //meta
    modifiable: !setting.locked,
    ownerControlled: true,
    govControlled: false,
  };
};
