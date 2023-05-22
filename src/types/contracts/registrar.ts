import { OverrideProperties } from "type-fest";
import {
  RegistrarMessages,
  RegistrarStorage,
} from "../typechain-types/contracts/core/registrar/interfaces/IRegistrar";
import { Plain } from "../utils";
import { SplitDetails } from "./common";

export type RebalanceDetails = {
  // should invested portions of the liquid account be rebalanced?
  rebalanceLiquidInvestedProfits: boolean;
  // should Locked acct interest earned be distributed to the Liquid Acct?
  lockedInterestsToLiquid: boolean;
  // % of Locked acct interest earned to be distributed to the Liquid Acct
  interest_distribution: number;
  // should Locked acct principle be distributed to the Liquid Acct?
  lockedPrincipleToLiquid: boolean;
  // % of Locked acct principle to be distributed to the Liquid Acct
  principle_distribution: number;
};

export type AcceptedTokens = {
  //this may not be final
  //?? erc20
  cw20: string[];
};

export type RegistrarConfig = OverrideProperties<
  Plain<RegistrarStorage.ConfigStruct>,
  { splitToLiquid: SplitDetails; collectorShare: number }
>;

export type RegistrarOwnerPayload = {
  new_owner: string;
};

export type RegistrarConfigUpdate = OverrideProperties<
  Plain<RegistrarMessages.UpdateConfigRequestStruct>,
  {
    splitMax: number;
    splitMin: number;
    splitDefault: number;
    collectorShare: number;
  }
>;
