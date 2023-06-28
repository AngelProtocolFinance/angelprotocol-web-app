import { OverrideProperties } from "type-fest";
import {
  LibAccounts,
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
