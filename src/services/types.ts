import {
  ASTProfile,
  ApplicationStatus,
  EndowmentProfile,
  EndowmentProfileUpdate,
  WalletProfile,
} from "types/aws";
import { EndowmentType } from "types/lists";
import { SemiPartial } from "types/utils";

export type MultisigConfig = {
  threshold: number;
  requireExecution: boolean;
  duration: number;
};

export type ChainQueryArgs = {
  address: string;
  chainId: string;
};

export interface IERC20 {
  amount: string;
  address: string;
}

export type Profile =
  | ({
      type: Extract<EndowmentType, "charity">;
    } & EndowmentProfile)
  | ({ type: Extract<EndowmentType, "ast"> } & ASTProfile);

//type guard
export function profileIsCharity(
  profile: Profile
): profile is EndowmentProfile & { type: "charity" } {
  return profile.type === "charity";
}

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
      org: {
        name: string;
        legalEntityType: string;
        hq: string;
        projectDescription: string;
      };
    }
  | string; //signerEID;

export type WalletProfileVersion = "legacy" | "latest";
export type VersionSpecificWalletProfile = WalletProfile & {
  version: "legacy" | "latest";
};

export type ApplicationStatusOptions = Exclude<ApplicationStatus, "inactive">;
