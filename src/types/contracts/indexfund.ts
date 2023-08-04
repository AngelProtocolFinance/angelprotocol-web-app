import { OverrideProperties } from "type-fest";
import {
  IIndexFund,
  IndexFundStorage,
} from "../typechain-types/contracts/core/index-fund/IndexFund";
import { Mapped } from "types/utils";

export type IndexFundConfig = OverrideProperties<
  IndexFundStorage.ConfigStruct,
  { fundRotation: number; fundingGoal: number }
>;

export type FundDetails = OverrideProperties<
  IIndexFund.FundResponseStruct,
  {
    id: number;
    endowments: number[];
    expiryTime: number;
    splitToLiquid: number;
  }
>;

export type NewFund = {
  name: string;
  description: string;
  members: string[]; //uint256[]
  rotatingFund: boolean;
  splitToLiquid: string; // "1-100"
  expiryTime: string; // uint256
  expiryHeight: string; // uint256
};

export type IndexFundConfigUpdate = IndexFundConfig;

export type FundMemberUpdate = {
  fundId: number;
  members: string[]; //uint256[]
};
