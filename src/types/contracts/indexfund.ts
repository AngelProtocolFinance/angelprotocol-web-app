import { OverrideProperties } from "type-fest";
import { IndexFundStorage } from "../typechain-types/contracts/core/index-fund/IndexFund";
import { IndexFundMessage } from "../typechain-types/contracts/core/index-fund/IndexFund";
import { Mapped, Plain } from "types/utils";

export type IndexFundConfig = OverrideProperties<
  Plain<IndexFundStorage.ConfigStruct>,
  { fundRotation: number; fundMemberLimit: number; fundingGoal: number }
>;

export type FundDetails = {
  id: number;
  name: string;
  description: string;
  members: number[];
  rotatingFund: boolean;
  splitToLiquid: number; //1-100
  expiryTime: number;
  expiryHeight: number;
};

export type NewFund = {
  name: string;
  description: string;
  members: string[]; //uint256[]
  rotatingFund: boolean;
  splitToLiquid: string; // "1-100"
  expiryTime: string; // uint256
  expiryHeight: string; // uint256
};

export type IndexFundConfigUpdate = Mapped<
  IndexFundMessage.UpdateConfigMessageStruct,
  string
>;
export type AllianceListUpdate = {
  address: string;
  action: "add" | "remove";
};

export type FundMemberUpdate = {
  fundId: number;
  members: number[];
};
