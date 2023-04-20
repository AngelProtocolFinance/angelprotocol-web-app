import type { BigNumber } from "@ethersproject/bignumber";
import { EndowmentStatusText, EndowmentType } from "types/contracts";
import { SettingsPermission } from "types/contracts";

type Categories = {
  sdgs: BigNumber[]; // u8 maps one of the 17 UN SDG
  general: BigNumber[]; //??
};

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
  endow_type: EndowmentTypeEnum;
  //logo
  //image
  status: EndowmentStatusEnum;
  //deposit_approved
  //withdraw_approved
  maturityTime: BigNumber;
  whitelistedBeneficiaries: string[];
  maturityWhitelist: string[];
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

export type DecodedIndexFundConfig = {
  owner: string;
  registrarContract: string;
  fundRotation: BigNumber;
  fundMemberLimit: BigNumber;
  fundingGoal: BigNumber;
  alliance_members: string[];
};

export type DecodedTransaction = {
  title: string;
  description: string;
  destination: string;
  value: BigNumber;
  data: string;
  executed: false;
  // string title;
  //       string description;
  //       address destination;
  //       uint256 value;
  //       bytes data;
  //       bool executed;
};
// ////////// CONVERTERS ///////////////

export function toSettingsPermission(p: Permission): SettingsPermission {
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
