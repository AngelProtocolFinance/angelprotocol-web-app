import type {
  BankingApplication,
  EndowmentProfileUpdate,
  EndowmentSettingsUpdate,
  FSASignerDocumentation,
  V2RecipientAccount,
} from "types/aws";
import type { SemiPartial } from "types/utils";

export type EndowmentUpdate = SemiPartial<
  EndowmentProfileUpdate & EndowmentSettingsUpdate,
  "id"
>;

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

export type BankingApplicationDetails = BankingApplication & V2RecipientAccount;

export type IdOrSlug =
  | { slug: string; id?: never }
  | { id: number; slug?: never };
