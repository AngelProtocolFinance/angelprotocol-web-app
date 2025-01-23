import type {
  BankingApplication,
  EndowmentAllocationUpdate,
  EndowmentProfileUpdate,
  EndowmentSettingsUpdate,
  V2RecipientAccount,
} from "types/aws";

export type EndowmentUpdate = Partial<
  EndowmentProfileUpdate & EndowmentSettingsUpdate & EndowmentAllocationUpdate
>;

export type ProgramDeleteMsg = { id: number; program_id: string };

export type BankingApplicationDetails = BankingApplication & V2RecipientAccount;
