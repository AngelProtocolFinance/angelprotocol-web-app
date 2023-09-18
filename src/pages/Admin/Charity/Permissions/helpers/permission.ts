import { ADDRESS_ZERO } from "constant/evm";
import { TPermission } from "../types";
import { SettingsPermission } from "types/contracts";
import { dateToFormFormat } from "components/form";
import { fromBlockTime } from "helpers/admin";

export const formPermission = (setting: SettingsPermission): TPermission => {
  const delegate = setting.delegate;
  const expires = delegate.expires !== 0;
  const isDelegated = delegate.addr !== ADDRESS_ZERO;
  return {
    delegated: isDelegated,
    addr: isDelegated ? delegate.addr : "",
    locked: setting.locked,
    expires,
    expiry: expires ? dateToFormFormat(fromBlockTime(delegate.expires)) : "",

    //meta
    modifiable: !setting.locked,
    ownerControlled: true,
    govControlled: false,
  };
};
