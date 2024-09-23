import type { Except } from "type-fest";
import type {
  BankingApplication,
  EndowmentAllocationUpdate,
  EndowmentProfileUpdate,
  EndowmentSettingsUpdate,
  RegV2,
  V2RecipientAccount,
} from "types/aws";
import type { SemiPartial } from "types/utils";

export type EndowmentUpdate = SemiPartial<
  EndowmentProfileUpdate & EndowmentSettingsUpdate & EndowmentAllocationUpdate,
  "id"
>;

export type ProgramDeleteMsg = { id: number; program_id: string };

export type FSASigner =
  | {
      id: string;
      first_name: string;
      last_name: string;
      role: string;
      email: string;
      docs: Except<
        RegV2.FsaDocs,
        "fsa_signed_doc_url" | "fsa_signing_url" | "outdated"
      > &
        Pick<RegV2.Org, "hq_country"> &
        Pick<RegV2.Contact, "org_name">;
    }
  | string; //signerEID;

export type BankingApplicationDetails = BankingApplication & V2RecipientAccount;

export type IdOrSlug =
  | { slug: string; id?: never }
  | { id: number; slug?: never };
