import {
  ASTProfile,
  BridgeFees,
  EndowmentProfile,
  EndowmentProfileUpdate,
} from "types/aws";
import { EndowmentDetails } from "types/contracts";
import { ApplicationProposal } from "types/contracts/multisig";
import { AccountType } from "types/lists";
import { SemiPartial } from "types/utils";

export type MultisigConfig = {
  threshold: number;
  requireExecution: boolean;
  duration: number;
};

type Base = {
  multisig: string;
  members: string[];
  id: number;
  config: MultisigConfig;
};

type APResource = Base & {
  type: "ap";
};
type ReviewResource = Base & {
  type: "review";
};
type CharityResource = Base & {
  type: "charity";
} & EndowmentDetails;

export type AdminResource = APResource | ReviewResource | CharityResource;

export type ChainQueryArgs = {
  address: string;
  chainId: string;
};

export interface IERC20 {
  amount: string;
  address: string;
}

export type EndowBalance = { [key in AccountType]: IERC20[] };

export type ProtocolFeeRates = {
  withdrawBps: number;
  //applied to charities only
  earlyLockedWithdrawBps: number;
};

export type WithdrawData = {
  balances: EndowBalance;
  bridgeFees: BridgeFees;
  protocolFeeRates: ProtocolFeeRates;
};

export type Profile =
  | ({
      type: "endowment";
    } & EndowmentProfile)
  | ({ type: "ast" } & ASTProfile);

//type guard
export function endow(
  profile: Profile
): profile is EndowmentProfile & { type: "endowment" } {
  return profile.type === "endowment";
}

export type CharityApplication = ApplicationProposal & {
  confirmations: number;
  userConfirmed: boolean;
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

export type Multisig = {
  recordId: string;
  address: string;
  owners: string[];
  approvalsRequired: number;
  requireExecution: boolean;
  transactionExpiry: number;
};
