import { OverrideProperties } from "type-fest";
import { AngelCoreStruct } from "../typechain-types/contracts/core/struct.sol/AngelCoreStruct";
import { UNSDG_NUMS } from "../lists";
import { Mapped, Plain } from "../utils";

export type SplitDetails = Mapped<
  Plain<AngelCoreStruct.SplitDetailsStruct>,
  number
>;

export type DonationsReceived = Mapped<
  AngelCoreStruct.DonationsReceivedStruct,
  string
>;

type BeneficiaryData = OverrideProperties<
  AngelCoreStruct.BeneficiaryDataStruct,
  { endowId: number; fundId: number; addr: string }
>;

/**
 * 0 Endowment
 * 1 IndexFund
 * 2 Wallet
 * 3 None
 */
export type Beneficiary = OverrideProperties<
  AngelCoreStruct.BeneficiaryStruct,
  { data: BeneficiaryData; enumData: 0 | 1 | 2 | 3 }
>;

export type EndowmentTierNum = 1 | 2 | 3;
