import type { BigNumber } from "@ethersproject/bignumber";
import { OverrideProperties } from "type-fest";
import { Delegate, GenericBalMap, SplitDetails } from "types/contracts";
import { EndowmentType } from "types/lists";
import { AngelCoreStruct } from "types/typechain-types/contracts/core/struct.sol/AngelCoreStruct";

enum EndowmentTypeEnum {
  Charity,
  Normal,
  None,
}

type DDelegate = OverrideProperties<Delegate, { expires: BigNumber }>;

export type DGenericBalance = {
  coinNativeAmount: BigNumber;
  Cw20CoinVerified_amount: BigNumber[];
  Cw20CoinVerified_addr: string[];
};

// ////////// CONVERTERS ///////////////

export function toDelegate(d: DDelegate): Delegate {
  return { addr: d.addr.toLowerCase(), expires: d.expires.toNumber() };
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
  d: AngelCoreStruct.SplitDetailsStructOutput
): SplitDetails {
  return {
    min: d.min.toNumber(),
    max: d.max.toNumber(),
    defaultSplit: d.defaultSplit.toNumber(),
  };
}
