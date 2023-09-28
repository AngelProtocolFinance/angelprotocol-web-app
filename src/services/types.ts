import { OverrideProperties } from "type-fest";
import {
  ASTProfile,
  BridgeFees,
  EndowmentProfile,
  EndowmentProfileUpdate,
  WalletProfile,
} from "types/aws";
import { EndowmentDetails } from "types/contracts";
import { AccountType, EndowmentType } from "types/lists";
import { Endowment } from "types/subgraph";
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

type Beneficiary = {
  type: "wallet" | "endowment" | "treasury";
  value: string;
};

export type EndowmentState = {
  closed: boolean;
  closingBeneficiary: Beneficiary;
};

type CharityResource = Base & {
  type: "charity";
} & EndowmentDetails &
  EndowmentState;

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

export type WithdrawDataQueryParams = {
  sourceEndowId?: number; //if not provided, source is withdrawer's
  withdrawer: {
    id: number;
    name: string;
    endowType: EndowmentType;
  };
};

type ClosedEndowmentSource = {
  id: string;
  name: string;
};

export type WithdrawData = {
  balances: EndowBalance;
  bridgeFees: BridgeFees;
  protocolFeeRates: ProtocolFeeRates;
  closedEndowmentSources: ClosedEndowmentSource[] | null;
};

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

export type Multisig = {
  recordId: string;
  address: string;
  owners: string[];
  approvalsRequired: number;
  requireExecution: boolean;
  transactionExpiry: number;
};

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

export type WithdrawEndowBeneficiary = OverrideProperties<
  Endowment,
  { name: string }
>;
