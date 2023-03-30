import type { BigNumber } from "@ethersproject/bignumber";
import { EndowmentStatusText, EndowmentType } from "types/contracts";

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

export interface EndowmentResponse {
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
  //pending_redemptions
  //proposal_link
  //referral_id
}

export interface StateResponse {
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

export interface FundDetails {
  id: BigNumber;
  name: string;
  description: string;
  members: BigNumber[];
  rotatingFund: boolean;
  splitToLiquid: BigNumber; //1-100
  expiryTime: BigNumber;
  expiryHeight: BigNumber;
}

// ////////// CONVERTERS ///////////////
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
