declare module "@types-page/admin" {
  import { Denoms } from "@types-lists";
  import {
    AllianceMember,
    EndowmentStatus,
    EndowmentStatusStrNum,
    FundConfig,
    FundDetails,
    Member,
    RegistrarConfigPayload,
    UpdateProfilePayload,
    ProposalStatus,
    RegistrarOwnerPayload,
  } from "@types-server/contracts";

  type AdminProposalParam = { id: string };

  type ProposalGroup = "indexfund" | "admin-group" | "endowment" | "registrar";
  type ProposalGroupOptions = ProposalGroup | "all";
  type ProposalStatusOptions = ProposalStatus | "all";

  type ProposalDetails = {
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

  type AdminProposalTypes =
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

  type DiffSet<T> = [keyof T, T[keyof T], T[keyof T]][];
  type MetaConstructor<K extends AdminProposalTypes, V> = {
    type: K;
    data: K extends AdminProposalTypes ? V : unknown;
  };

  type FundPreview = Omit<FundDetails, "id">;
  type SourcePreview = { vaultName: string; usdAmount: number };

  /** _shared */
  type OwnerUpdateMeta = MetaConstructor<
    "indexfund-owner-update" | "registrar-update-owner",
    { owner: string; newOwner: string }
  >;
  /** _indexfund */
  type AllianceEditMeta = MetaConstructor<
    "indexfund-alliance-edit",
    {
      toAddMembers: AllianceMember[];
      toRemoveMembers: AllianceMember[];
      editedMembers: AllianceMember[];
    }
  >;
  type CreateFundMeta = MetaConstructor<"indexfund-create-fund", FundPreview>;
  type RemoveFundMeta = MetaConstructor<"indexfund-remove-fund", FundPreview>;

  type FundMemberUpdateMeta = MetaConstructor<
    "indexfund-update-fund-members",
    {
      fundId: string;
      fundName: string;
      toRemove: string[];
      toAdd: string[];
    }
  >;

  type FundConfigUpdateMeta = MetaConstructor<
    "indexfund-config-update",
    DiffSet<FundConfig>
  >;

  /** _admin-group */

  type CWMemberUpdateMeta = MetaConstructor<
    "admin-group-update-members",
    {
      toAdd: Member[];
      toRemove: string[];
    }
  >;
  type CW3ConfigUpdateMeta = MetaConstructor<
    "admin-group-update-cw3-config",
    DiffSet<CW3ConfigPayload>
  >;

  type FundSendMeta = MetaConstructor<
    "admin-group-fund-transfer",
    Pick<FundSendPayload, "amount" | "currency" | "recipient">
  >;

  /** _endowment */
  type EndowmentStatusMeta = MetaConstructor<
    "endowment-update-status",
    {
      fromStatus: keyof EndowmentStatus;
      toStatus: EndowmentStatusStrNum;
      beneficiary?: string;
    }
  >;

  type EndowmentWithdrawMeta = MetaConstructor<
    "endowment-withdraw",
    {
      totalAmount: number;
      sourcesPreview: SourcePreview[];
      beneficiary: string;
    }
  >;

  type EndowmentProfileUpdateMeta = MetaConstructor<
    "endowment-update-profile",
    DiffSet<UpdateProfilePayload>
  >;

  /** _registrar */
  type RegistrarConfigUpdateMeta = MetaConstructor<
    "registrar-update-config",
    DiffSet<RegistrarConfigPayload>
  >;

  type ProposalMeta =
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
  type ProposalBase = {
    title: string;
    description: string;
  };
  type FundIdContext = { fundId: string };
  type AllianceEditValues = ProposalBase & Required<AllianceMember>;

  type CW3ConfigPayload = {
    //percent vote to pass poll
    threshold: number;
    //poll duration in block height
    height: number;
  };
  type CW3ConfigValues = ProposalBase &
    CW3ConfigPayload & { initialCW3Config: CW3ConfigPayload };
  type EndowmentUpdateValues = ProposalBase & {
    endowmentAddr: string;
    status: EndowmentStatusStrNum;
    //address to transfer funds when endowment will be closed
    beneficiary?: string;

    //metadata
    prevStatus?: keyof EndowmentStatus;
  };
  type FundConfigValues = ProposalBase &
    FundConfig & { initialConfigPayload: FundConfig };

  type FundCreatorValues = ProposalBase & {
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

  type FundDestroyValues = ProposalBase & { fundId: string };

  type FundSendPayload = {
    amount: number;
    recipient: string;

    //metadata
    currency: "uusd" | "halo";
    haloBalance: number;
    ustBalance: number;
  };

  type FundSendValues = ProposalBase & FundSendPayload;
  type FundUpdateValues = ProposalBase & {
    fundId: string;
    newMemberAddr: string;
  };

  type IndexFundOwnerValues = ProposalBase &
    RegistrarOwnerPayload & { initialOwner: string };

  type MemberUpdatorValues = ProposalBase & {
    addr: string;
    weight: string;
  };

  type RegistrarConfigValues = ProposalBase &
    RegistrarConfigPayload & { initialConfigPayload: RegistrarConfigPayload };

  type RegistrarOwnerValues = ProposalBase &
    RegistrarOwnerPayload & { initialOwner: string };
}
