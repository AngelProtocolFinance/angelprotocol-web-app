import type { BankingApplication } from "types/applications";
import type { V2RecipientAccount } from "types/bank-details";
import type {
  EndowmentAllocationUpdate,
  EndowmentProfileUpdate,
  EndowmentSettingsUpdate,
} from "types/npo";

export type EndowmentUpdate = Partial<
  EndowmentProfileUpdate & EndowmentSettingsUpdate & EndowmentAllocationUpdate
>;

export type ProgramDeleteMsg = { id: number; program_id: string };

export type BankingApplicationDetails = BankingApplication & V2RecipientAccount;
