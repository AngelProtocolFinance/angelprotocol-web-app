import { Except } from "type-fest";
import {
  EndowmentProfileUpdate,
  FSASignerDocumentation,
  InReview,
  WalletProfile,
} from "types/aws";
import { SemiPartial } from "types/utils";

export type ChainQueryArgs = {
  address: string;
  chainId: string;
};

export type ProfileUpdateMsg = SemiPartial<
  EndowmentProfileUpdate,
  "id" | "owner"
>;

export type ProgramDeleteMsg = Pick<
  EndowmentProfileUpdate,
  "id" | "owner" | "program_id"
>;

export type ProfileUpdatePayload = {
  unsignedMsg: ProfileUpdateMsg | ProgramDeleteMsg;
  rawSignature: string;
};

export function isDeleteMsg(
  msg: ProfileUpdateMsg | ProgramDeleteMsg
): msg is ProgramDeleteMsg {
  return (
    //for edits, program_id is accompanied by program:[]
    Object.keys(msg).length === 3 && !!(msg as ProgramDeleteMsg).program_id
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

//transformed registration/Application
export type EndowmentApplication = Except<InReview["ContactPerson"], "SK"> &
  Except<InReview["Registration"], "SK">;
