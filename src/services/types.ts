import {
  BankingApplication,
  EndowmentProfileUpdate,
  EndowmentProgramsUpdate,
  EndowmentSettingsUpdate,
  FSASignerDocumentation,
  MileStone,
  Program,
  V2RecipientAccount,
  WalletProfile,
} from "types/aws";
import { SemiPartial } from "types/utils";

export type ChainQueryArgs = {
  address: string;
  chainId: string;
};

export type EndowmentUpdate = SemiPartial<
  EndowmentProfileUpdate & EndowmentSettingsUpdate & EndowmentProgramsUpdate,
  "id"
>;

export type NewProgram = Omit<Program, "id" | "milestones"> & {
  milestones: Omit<MileStone, "id">[];
};

export type ProgramDeleteMsg = { id: number; program_id: string };

export type FiscalSponsorhipAgreementSigner =
  | {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      docs: FSASignerDocumentation;
    }
  | string; //signerEID;

export type VersionSpecificWalletProfile = WalletProfile & {
  version: "legacy" | "latest";
};

export type BankingApplicationDetails = BankingApplication & V2RecipientAccount;

export type IdOrSlug =
  | { slug: string; id?: never }
  | { id: number; slug?: never };
