import type { BigNumber } from "@ethersproject/bignumber";
import { OverrideProperties } from "type-fest";
import {
  Beneficiary,
  Categories,
  Delegate,
  EndowmentDetails,
  EndowmentStatus,
  EndowmentStatusText,
  FundDetails,
  GenericBalMap,
  IndexFundConfig,
  RebalanceDetails,
  RegistrarConfig,
  SettingsController,
  SplitDetails,
} from "types/contracts";
import { SettingsPermission } from "types/contracts";
import { EndowmentType } from "types/lists";
import { Mapped } from "types/utils";

enum EndowmentTypeEnum {
  Charity,
  Normal,
  None,
}

type DRebalanceDetails = OverrideProperties<
  RebalanceDetails,
  {
    interest_distribution: BigNumber;
    principle_distribution: BigNumber;
  }
>;

type DSplitDetails = Mapped<SplitDetails, BigNumber>;

export type DRegistrarConfig = OverrideProperties<
  RegistrarConfig,
  {
    rebalance: DRebalanceDetails;
    splitToLiquid: DSplitDetails;
    collectorShare: BigNumber;
  }
>;

type DDelegate = OverrideProperties<Delegate, { expires: BigNumber }>;

type DPermission = OverrideProperties<
  SettingsPermission,
  { delegate: DDelegate }
>;
type DSettingsController = Mapped<SettingsController, DPermission>;

type DCategories = OverrideProperties<
  Categories,
  {
    sdgs: BigNumber[];
    general: BigNumber[];
  }
>;

export type DEndowment = OverrideProperties<
  EndowmentDetails,
  {
    categories: DCategories;
    endow_type: EndowmentTypeEnum;
    status: EndowmentStatus;
    maturityTime: BigNumber;
    settingsController: DSettingsController;
    splitToLiquid: DSplitDetails;
  }
>;

export type DGenericBalance = {
  coinNativeAmount: BigNumber;
  Cw20CoinVerified_amount: BigNumber[];
  Cw20CoinVerified_addr: string[];
};

type DBeneficiaryData = OverrideProperties<
  Beneficiary["data"],
  { id: BigNumber }
>;
type DBeneficiary = OverrideProperties<
  Beneficiary,
  {
    data: DBeneficiaryData;
    enumData: BigNumber;
  }
>;
export interface DEndowmentState {
  donationsReceived: {
    liquid: BigNumber;
    locked: BigNumber;
  };
  balances: {
    locked: DGenericBalance;
    liquid: DGenericBalance;
  };
  closingEndowment: boolean;
  closingBeneficiary: DBeneficiary;
}

export type DFund = OverrideProperties<
  FundDetails,
  {
    id: BigNumber;
    members: BigNumber[];
    splitToLiquid: BigNumber;
    expiryTime: BigNumber;
    expiryHeight: BigNumber;
  }
>;

export type DIndexFundConfig = OverrideProperties<
  IndexFundConfig,
  {
    fundRotation: BigNumber;
    fundMemberLimit: BigNumber;
    fundingGoal: BigNumber;
  }
>;

export type DTransaction = {
  title: string;
  description: string;
  destination: string;
  value: BigNumber;
  data: string;
  executed: false;
};
// ////////// CONVERTERS ///////////////

export function toSettingsPermission(p: DPermission): SettingsPermission {
  return {
    ownerControlled: p.ownerControlled,
    govControlled: p.govControlled,
    modifiableAfterInit: p.modifiableAfterInit,
    delegate: {
      Addr: p.delegate.Addr,
      expires: p.delegate.expires.toNumber(),
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

export function toEndowStatusText(
  status: EndowmentStatus
): EndowmentStatusText {
  switch (status) {
    case EndowmentStatus.Inactive:
      return "inactive";
    case EndowmentStatus.Approved:
      return "approved";
    case EndowmentStatus.Frozen:
      return "frozen";
    case EndowmentStatus.Closed:
      return "closed";
    default:
      return "inactive";
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

export function toSplit(d: DSplitDetails): SplitDetails {
  return {
    min: d.min.toNumber(),
    max: d.max.toNumber(),
    defaultSplit: d.defaultSplit.toNumber(),
  };
}
