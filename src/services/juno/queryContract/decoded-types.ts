import type { BigNumber } from "@ethersproject/bignumber";
import {
  AccountsSplitDetails,
  Fee,
  GenericBalMap,
  SettingsPermission,
} from "types/contracts";
import { EndowmentType } from "types/lists";
import { LibAccounts as AccountsLibs } from "types/typechain-types/contracts/core/accounts/interfaces/IAccounts";

enum EndowmentTypeEnum {
  Charity,
  Normal,
  None,
}

export type DGenericBalance = {
  coinNativeAmount: BigNumber;
  Cw20CoinVerified_amount: BigNumber[];
  Cw20CoinVerified_addr: string[];
};

// ////////// CONVERTERS ///////////////

export function toPermission(
  d: AccountsLibs.SettingsPermissionStructOutput
): SettingsPermission {
  return {
    locked: d.locked,
    delegate: {
      addr: d.delegate.addr.toLowerCase(),
      expires: d.delegate.expires.toNumber(),
    },
  };
}

export function toEndowType(type: EndowmentTypeEnum): EndowmentType {
  switch (type) {
    case EndowmentTypeEnum.Charity:
      return "charity";
    case EndowmentTypeEnum.Normal:
      return "normal";
    default:
      return "normal";
  }
}

export function toBalMap(d: DGenericBalance): GenericBalMap {
  const erc20s = d.Cw20CoinVerified_addr.reduce((prev, curr, i) => {
    return {
      ...prev,
      [curr.toLowerCase()]: d.Cw20CoinVerified_amount[i].toString(),
    };
  }, {});

  return { ...erc20s, native: d.coinNativeAmount.toString() };
}

export function toSplit(
  d: AccountsLibs.SplitDetailsStructOutput
): AccountsSplitDetails {
  return {
    min: d.min.toNumber(),
    max: d.max.toNumber(),
    defaultSplit: d.defaultSplit.toNumber(),
  };
}

export function toFee(d: AccountsLibs.FeeSettingStructOutput): Fee {
  return {
    payoutAddress: d.payoutAddress.toLowerCase(),
    bps: d.bps.toNumber(),
  };
}
