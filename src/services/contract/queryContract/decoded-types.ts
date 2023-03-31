import type { BigNumber } from "@ethersproject/bignumber";
import { EndowmentStatusText, EndowmentType } from "types/contracts";
import { SettingsPermission } from "types/contracts";

type Categories = {
  sdgs: BigNumber[]; // u8 maps one of the 17 UN SDG
  general: BigNumber[]; //??
};

enum TypeEnum {
  Charity,
  Normal,
  None,
}

enum StatusEnum {
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

type Delegate = {
  Addr: string;
  expires: BigNumber;
};

type Permission = {
  ownerControlled: boolean;
  govControlled: boolean;
  modifiableAfterInit: boolean;
  delegate: Delegate;
};

type SettingsController = {
  endowmentController: Permission;
  strategies: Permission;
  whitelistedBeneficiaries: Permission;
  whitelistedContributors: Permission;
  maturityWhitelist: Permission;
  maturityTime: Permission;
  profile: Permission;
  earningsFee: Permission;
  withdrawFee: Permission;
  depositFee: Permission;
  aumFee: Permission;
  kycDonorsOnly: Permission;
  name: Permission;
  image: Permission;
  logo: Permission;
  categories: Permission;
  splitToLiquid: Permission;
  ignoreUserSplits: Permission;
};

export interface DecodedEndowment {
  owner: string;
  categories: Categories;
  //tier
  endow_type: TypeEnum;
  //logo
  //image
  status: StatusEnum;
  //deposit_approved
  //withdraw_approved
  maturity_time: BigNumber;
  //invested_strategies:
  //rebalance
  kycDonorsOnly: boolean;
  settingsController: SettingsController;
  //pending_redemptions
  //proposal_link
  //referral_id
}

export interface DecodedEndowmentState {
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

export interface DecodedFund {
  id: BigNumber;
  name: string;
  description: string;
  members: BigNumber[];
  rotatingFund: boolean;
  splitToLiquid: BigNumber; //1-100
  expiryTime: BigNumber;
  expiryHeight: BigNumber;
}

export type DecodedGiftCardBalance = {
  coinNativeAmount: BigNumber;
  Cw20CoinVerified_amount: BigNumber[];
  Cw20CoinVerified_addr: string[];
};

// ////////// CONVERTERS ///////////////
export function toPermission(permission: Permission): SettingsPermission {
  const { delegate } = permission;
  return {
    ...permission,
    delegate: { ...delegate, expires: delegate.expires?.toNumber() },
  };
}

export function toEndowType(type: TypeEnum): EndowmentType {
  switch (type) {
    case TypeEnum.Charity:
      return "charity";
    case TypeEnum.Normal:
      return "normal";
    default:
      return "normal";
  }
}

export function toEndowStatus(status: StatusEnum): EndowmentStatusText {
  switch (status) {
    case StatusEnum.Inactive:
      return "inactive";
    case StatusEnum.Approved:
      return "approved";
    case StatusEnum.Frozen:
      return "frozen";
    case StatusEnum.Closed:
      return "closed";
    default:
      return "inactive";
  }
}
