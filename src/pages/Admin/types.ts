import { CharityApplication } from "types/server/aws";
import {
  AllianceMember,
  EndowmentStatus,
  EndowmentStatusStrNum,
  FundConfig,
  FundDetails,
  Member,
  RegistrarConfigPayload,
  RegistrarOwnerPayload,
  UpdateProfilePayload,
  Vote,
} from "types/server/contracts";

export type AdminParams = { address: string };
export type ProposalParams = { id: string };

export type Templates =
  //index fund
  | "if_alliance"
  | "if_create"
  | "if_remove"
  | "if_members"
  | "if_config"
  | "if_owner"

  //cw3
  | "cw3_config"
  | "cw3_transfer"

  //cw4
  | "cw4_members"

  //account
  | "acc_withdraw"
  | "acc_profile"

  //registrar
  | "reg_endow_status"
  | "reg_config"
  | "reg_owner";

export type DiffSet<T> = [keyof T, T[keyof T], T[keyof T]][];
export type MetaConstructor<K extends Templates, V> = {
  type: K;
  data: K extends Templates ? V : unknown;
};

export type FundPreview = Omit<FundDetails, "id">;
export type SourcePreview = { vaultName: string; usdAmount: number };

/** _shared */
export type OwnerUpdateMeta = MetaConstructor<
  "if_owner" | "reg_owner",
  { owner: string; newOwner: string }
>;
/** _indexfund */
export type AllianceEditMeta = MetaConstructor<
  "if_alliance",
  {
    toAddMembers: AllianceMember[];
    toRemoveMembers: AllianceMember[];
    editedMembers: AllianceMember[];
  }
>;
export type CreateFundMeta = MetaConstructor<"if_create", FundPreview>;
export type RemoveFundMeta = MetaConstructor<"if_remove", FundPreview>;

export type FundMemberUpdateMeta = MetaConstructor<
  "if_members",
  {
    fundId: string;
    fundName: string;
    toRemove: string[];
    toAdd: string[];
  }
>;

export type FundConfigUpdateMeta = MetaConstructor<
  "if_config",
  DiffSet<FundConfig>
>;

/** _admin-group */

export type CW4MemberUpdateMeta = MetaConstructor<
  "cw4_members",
  {
    toAdd: Member[];
    toRemove: string[];
  }
>;
export type CW3ConfigUpdateMeta = MetaConstructor<
  "cw3_config",
  DiffSet<CW3ConfigPayload>
>;

export type FundSendMeta = MetaConstructor<
  "cw3_transfer",
  Pick<FundSendPayload, "amount" | "currency" | "recipient">
>;

/** _endowment */

export type EndowmentWithdrawMeta = MetaConstructor<
  "acc_withdraw",
  {
    totalAmount: number;
    sourcesPreview: SourcePreview[];
    beneficiary: string;
  }
>;

export type EndowmentProfileUpdateMeta = MetaConstructor<
  "acc_profile",
  DiffSet<UpdateProfilePayload>
>;

/** _registrar */
export type RegistrarConfigUpdateMeta = MetaConstructor<
  "reg_config",
  DiffSet<RegistrarConfigPayload>
>;
export type EndowmentStatusMeta = MetaConstructor<
  "reg_endow_status",
  {
    fromStatus: keyof EndowmentStatus;
    toStatus: EndowmentStatusStrNum;
    beneficiary?: string;
  }
>;

export type ProposalMeta =
  //shared
  | OwnerUpdateMeta //registrar / index-fund
  //index-fund
  | OwnerUpdateMeta
  | AllianceEditMeta
  | CreateFundMeta
  | RemoveFundMeta
  | FundMemberUpdateMeta
  | FundConfigUpdateMeta
  //admin-group
  | CW4MemberUpdateMeta
  | CW3ConfigUpdateMeta
  | FundSendMeta
  //endowment
  | EndowmentStatusMeta
  | EndowmentWithdrawMeta
  | EndowmentProfileUpdateMeta
  //registrar
  | RegistrarConfigUpdateMeta;

/** _templates */
export type ProposalBase = {
  title: string;
  description: string;
};
export type FundIdContext = { fundId: string };
export type AllianceEditValues = ProposalBase & Required<AllianceMember>;

export type CW3ConfigPayload = {
  //percent vote to pass poll
  threshold: number;
  //poll duration in block height
  height: number;
};
export type CW3ConfigValues = ProposalBase &
  CW3ConfigPayload & { initialCW3Config: CW3ConfigPayload };
export type EndowmentUpdateValues = ProposalBase & {
  endowmentAddr: string;
  status: EndowmentStatusStrNum;
  //address to transfer funds when endowment will be closed
  beneficiary?: string;

  //metadata
  prevStatus?: keyof EndowmentStatus;
};
export type FundConfigValues = ProposalBase &
  FundConfig & { initialConfigPayload: FundConfig };

export type FundCreatorValues = ProposalBase & {
  //new fund member
  newFundAddr: string;

  //fund details
  fundName: string;
  fundDescription: string;
  expiryHeight: string;
  expiryTime: string;
  isFundRotating: boolean; //defaulted to true
  splitToLiquid: string; //handled by slider limits
};

export type FundDestroyValues = ProposalBase & { fundId: string };

export type FundSendPayload = {
  amount: number;
  recipient: string;

  //metadata
  currency: "uusd" | "halo";
  haloBalance: number;
  ustBalance: number;
};

export type FundSendValues = ProposalBase & FundSendPayload;
export type FundUpdateValues = ProposalBase & {
  fundId: string;
  newMemberAddr: string;
};

export type IndexFundOwnerValues = ProposalBase &
  RegistrarOwnerPayload & { initialOwner: string };

export type MemberUpdatorValues = ProposalBase & {
  addr: string;
  weight: string;
};

export type RegistrarConfigValues = ProposalBase &
  RegistrarConfigPayload & { initialConfigPayload: RegistrarConfigPayload };

export type RegistrarOwnerValues = ProposalBase &
  RegistrarOwnerPayload & { initialOwner: string };

export type UpdateProfileValues = ProposalBase &
  UpdateProfilePayload & { initialProfile: UpdateProfilePayload };

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Pick<
  CharityApplication,
  | "CharityName"
  | "RegistrationDate"
  | "RegistrationStatus"
  | "CharityName_ContactEmail"
  | "JunoWallet"
>;
