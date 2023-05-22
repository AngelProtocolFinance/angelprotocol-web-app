import { OverrideProperties } from "type-fest";
import {
  RegistrarMessages,
  RegistrarStorage,
} from "../typechain-types/contracts/core/registrar/interfaces/IRegistrar";
import { Plain } from "../utils";
import { SplitDetails } from "./common";

export type AcceptedTokens = {
  //this may not be final
  //?? erc20
  cw20: string[];
};

export type RegistrarConfig = OverrideProperties<
  Plain<RegistrarStorage.ConfigStruct>,
  { splitToLiquid: SplitDetails; collectorShare: number }
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
