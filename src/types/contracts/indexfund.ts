import { OverrideProperties } from "type-fest";
import {
  AngelCoreStruct,
  IndexFundMessage,
  IndexFundStorage,
} from "../typechain-types/contracts/core/index-fund/IndexFund";
import { Mapped, Plain } from "types/utils";

export type IndexFundConfig = OverrideProperties<
  Plain<IndexFundStorage.ConfigStruct>,
  { fundRotation: number; fundMemberLimit: number; fundingGoal: number }
>;

export type FundDetails = OverrideProperties<
  Plain<AngelCoreStruct.IndexFundStruct>,
  {
    id: number;
    members: number[];
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

export type IndexFundConfigUpdate = Mapped<
  IndexFundMessage.UpdateConfigMessageStruct,
  number
>;

export type FundMemberUpdate = {
  fundId: number;
  members: string[]; //uint256[]
};
