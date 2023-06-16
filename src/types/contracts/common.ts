import { AngelCoreStruct } from "../typechain-types/contracts/core/struct.sol/AngelCoreStruct";
import { Mapped, Plain } from "../utils";

export type SplitDetails = Mapped<
  Plain<AngelCoreStruct.SplitDetailsStruct>,
  number
>;

export type EndowmentTierNum = 1 | 2 | 3;
