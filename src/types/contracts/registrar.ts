import { OverrideProperties } from "type-fest";
import {
  LibAccounts,
  LocalRegistrarLib,
  RegistrarMessages,
  RegistrarStorage,
} from "../typechain-types/contracts/core/registrar/interfaces/IRegistrar";
import { Mapped, Plain } from "../utils";

export type RegistrarSplitDetails = Mapped<
  Plain<LibAccounts.SplitDetailsStruct>,
  number
>;

export type AcceptedTokens = {
  //this may not be final
  //?? erc20
  cw20: string[];
};

export type RegistrarConfig = OverrideProperties<
  Plain<RegistrarStorage.ConfigStruct>,
  { splitToLiquid: RegistrarSplitDetails; collectorShare: number }
>;

export type RegistrarConfigUpdate = OverrideProperties<
  Plain<RegistrarMessages.UpdateConfigRequestStruct>,
  {
    splitMax: number;
    splitMin: number;
    splitDefault: number;
    collectorShare: number;
  }
>;

//word version of enum, conversion to number done in query
export type FeeType =
  | "Default"
  | "Harvest"
  | "WithdrawCharity"
  | "WithdrawNormal"
  | "EarlyLockedWithdrawCharity"
  | "EarlyLockedWithdrawNormal";

//same with accounts/Fee
export type FeeSetting = OverrideProperties<
  Plain<LibAccounts.FeeSettingStruct>,
  { bps: number }
>;

/**
 * 0 - locked
 * 1 - liquid
 */
type VaultParams = OverrideProperties<
  LocalRegistrarLib.VaultParamsStruct,
  {
    Type: number;
    vaultAddr: string;
  }
>;
/**
 * 0 - not approved
 * 1 - approved
 * 2 - withdraw only
 * 3 - deprecated
 */
export type StrategyParams = OverrideProperties<
  LocalRegistrarLib.StrategyParamsStruct,
  {
    approvalState: number;
    network: string;
    Locked: VaultParams;
    Liquid: VaultParams;
  }
>;
