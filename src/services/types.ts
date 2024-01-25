import {
  BankingApplication,
  EndowmentProfileUpdate,
  FSASignerDocumentation,
  V2RecipientAccount,
  WalletProfile,
} from "types/aws";
import { SemiPartial } from "types/utils";

export type ChainQueryArgs = {
  address: string;
  chainId: string;
};

export type ProfileUpdateMsg = SemiPartial<EndowmentProfileUpdate, "id">;

export type ProgramDeleteMsg = Pick<
  EndowmentProfileUpdate,
  "id" | "program_id"
>;

export function isDeleteMsg(
  msg: ProfileUpdateMsg | ProgramDeleteMsg
): msg is ProgramDeleteMsg {
  return (
    //for edits, program_id is accompanied by program:[]
    Object.keys(msg).length === 2 && !!(msg as ProgramDeleteMsg).program_id
  );
}

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
