import { OverrideProperties } from "type-fest";
import {
  LibAccounts,
  RegistrarMessages,
  RegistrarStorage,
} from "../typechain-types/contracts/core/registrar/interfaces/IRegistrar";

export type AcceptedTokens = {
  //this may not be final
  //?? erc20
  cw20: string[];
};

export type RegistrarConfig = RegistrarStorage.ConfigStruct;
export type RegistrarConfigUpdate = RegistrarMessages.UpdateConfigRequestStruct;

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
  LibAccounts.FeeSettingStruct,
  { bps: number }
>;
