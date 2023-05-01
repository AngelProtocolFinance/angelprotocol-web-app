import type { BigNumber } from "@ethersproject/bignumber";
import { OverrideProperties } from "type-fest";
import {
  Categories,
  Delegate,
  EndowmentDetails,
  EndowmentStatusText,
  EndowmentType,
  FundDetails,
  IndexFundConfig,
  SettingsController,
} from "types/contracts";
import { SettingsPermission } from "types/contracts";
import { Mapped } from "types/utils";

enum EndowmentTypeEnum {
  Charity,
  Normal,
  None,
}

enum EndowmentStatusEnum {
  Inactive,
  Approved,
  Frozen,
  Closed,
}

enum BeneficiaryEnum {
  EndowmentId,
  IndexFund,
  Wallet,
  None,
}

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
    status: EndowmentStatusEnum;
    maturityTime: BigNumber;
    settingsController: DSettingsController;
  }
>;

export interface DEndowmentState {
  donationsReceived: {
    liquid: BigNumber;
    locked: BigNumber;
  };
  closingEndowment: boolean;
  closingBeneficiary: {
    data: {
      id: BigNumber;
      addr: string;
    };
    enumData: BeneficiaryEnum;
  };
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

export type DGiftCardBalance = {
  coinNativeAmount: BigNumber;
  Cw20CoinVerified_amount: BigNumber[];
  Cw20CoinVerified_addr: string[];
};

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
  status: EndowmentStatusEnum
): EndowmentStatusText {
  switch (status) {
    case EndowmentStatusEnum.Inactive:
      return "inactive";
    case EndowmentStatusEnum.Approved:
      return "approved";
    case EndowmentStatusEnum.Frozen:
      return "frozen";
    case EndowmentStatusEnum.Closed:
      return "closed";
    default:
      return "inactive";
  }
}
