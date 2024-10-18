import type {
  BankingApplication,
  EndowmentAllocationUpdate,
  EndowmentProfileUpdate,
  EndowmentSettingsUpdate,
  V2RecipientAccount,
} from "types/aws";
import type { SemiPartial } from "types/utils";

export type EndowmentUpdate = SemiPartial<
  EndowmentProfileUpdate & EndowmentSettingsUpdate & EndowmentAllocationUpdate,
  "id"
>;

export type ProgramDeleteMsg = { id: number; program_id: string };

export type BankingApplicationDetails = BankingApplication & V2RecipientAccount;
