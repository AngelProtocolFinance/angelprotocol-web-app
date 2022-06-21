import { CharityApplication } from "types/server/aws";
import {
  AdminVoteInfo,
  AllianceMember,
  EndowmentStatus,
  EndowmentStatusStrNum,
  FundConfig,
  FundDetails,
  Member,
  ProposalStatus,
  RegistrarConfigPayload,
  RegistrarOwnerPayload,
  UpdateProfilePayload,
  Vote,
} from "types/server/contracts";

export type AdminProposalParam = { id: string };

export type ProposalGroup =
  | "indexfund"
  | "admin-group"
  | "endowment"
  | "registrar";
export type ProposalGroupOptions = ProposalGroup | "all";
export type ProposalStatusOptions = ProposalStatus | "all";

export type ProposalDetails = {
  numYes: number;
  numNo: number;
  numNotYet: number;
  pctYes: number;
  pctNo: number;
  pctNotYet: number;
  blockHeight: string;
  expiry: number;
  remainingBlocks: number;
  isVoteEnded: boolean;
  isExecutable: boolean;
  isExecuted: boolean;
  numId: number;
  userVote?: Vote;
  votes: AdminVoteInfo[];
  meta?: string;
};

export type AdminProposalTypes =
  //index fund
  | "indexfund-alliance-edit"
  | "indexfund-create-fund"
  | "indexfund-remove-fund"
  | "indexfund-update-fund-members"
  | "indexfund-config-update"
  | "indexfund-owner-update"
  //admin group
  | "admin-group-update-members"
  | "admin-group-update-cw3-config"
  | "admin-group-fund-transfer"
  //endowment
  | "endowment-update-status"
  | "endowment-withdraw"
  | "endowment-update-profile"

  //registrar
  | "registrar-update-config"
  | "registrar-update-owner";

export type DiffSet<T> = [keyof T, T[keyof T], T[keyof T]][];
export type MetaConstructor<K extends AdminProposalTypes, V> = {
  type: K;
  data: K extends AdminProposalTypes ? V : unknown;
};

export type FundPreview = Omit<FundDetails, "id">;
export type SourcePreview = { vaultName: string; usdAmount: number };

/** _shared */
export type OwnerUpdateMeta = MetaConstructor<
  "indexfund-owner-update" | "registrar-update-owner",
  { owner: string; newOwner: string }
>;
/** _indexfund */
export type AllianceEditMeta = MetaConstructor<
  "indexfund-alliance-edit",
  {
    toAddMembers: AllianceMember[];
    toRemoveMembers: AllianceMember[];
    editedMembers: AllianceMember[];
  }
>;
export type CreateFundMeta = MetaConstructor<
  "indexfund-create-fund",
  FundPreview
>;
export type RemoveFundMeta = MetaConstructor<
  "indexfund-remove-fund",
  FundPreview
>;

export type FundMemberUpdateMeta = MetaConstructor<
  "indexfund-update-fund-members",
  {
    fundId: string;
    fundName: string;
    toRemove: string[];
    toAdd: string[];
  }
>;

export type FundConfigUpdateMeta = MetaConstructor<
  "indexfund-config-update",
  DiffSet<FundConfig>
>;

/** _admin-group */

export type CWMemberUpdateMeta = MetaConstructor<
  "admin-group-update-members",
  {
    toAdd: Member[];
    toRemove: string[];
  }
>;
export type CW3ConfigUpdateMeta = MetaConstructor<
  "admin-group-update-cw3-config",
  DiffSet<CW3ConfigPayload>
>;

export type FundSendMeta = MetaConstructor<
  "admin-group-fund-transfer",
  Pick<FundSendPayload, "amount" | "currency" | "recipient">
>;

/** _endowment */
export type EndowmentStatusMeta = MetaConstructor<
  "endowment-update-status",
  {
    fromStatus: keyof EndowmentStatus;
    toStatus: EndowmentStatusStrNum;
    beneficiary?: string;
  }
>;

export type EndowmentWithdrawMeta = MetaConstructor<
  "endowment-withdraw",
  {
    totalAmount: number;
    sourcesPreview: SourcePreview[];
    beneficiary: string;
  }
>;

export type EndowmentProfileUpdateMeta = MetaConstructor<
  "endowment-update-profile",
  DiffSet<UpdateProfilePayload>
>;

/** _registrar */
export type RegistrarConfigUpdateMeta = MetaConstructor<
  "registrar-update-config",
  DiffSet<RegistrarConfigPayload>
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
  | CWMemberUpdateMeta
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

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Pick<
  CharityApplication,
  | "CharityName"
  | "RegistrationDate"
  | "RegistrationStatus"
  | "CharityName_ContactEmail"
  | "JunoWallet"
>;
