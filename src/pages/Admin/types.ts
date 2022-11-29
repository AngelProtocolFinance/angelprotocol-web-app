import { Coin } from "@cosmjs/proto-signing";
import { ImgLink } from "components/ImgEditor/types";
import { CharityApplication, Registration } from "types/aws";
import {
  AllianceMember,
  Asset,
  CW4Member,
  EndowmentSettingsPayload,
  EndowmentStatus,
  EndowmentStatusStrNum,
  EndowmentStatusText,
  FundConfig,
  FundDetails,
  ProfileUpdate,
  RegistrarConfigPayload,
  RegistrarOwnerPayload,
} from "types/contracts";
import { UNSDG_NUMS } from "types/lists";
import { DiffSet } from "types/utils";

export type AdminParams = { id: string; type: string /**AccountType */ };
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
  | "cw3_application"
  | "review_cw3_config"

  //cw4
  | "cw4_members"

  //account
  | "acc_withdraw"
  | "acc_profile"
  | "acc_endow_status"

  //registrar
  | "reg_config"
  | "reg_owner";

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

/** _cw4 */

export type CW4MemberUpdateMeta = MetaConstructor<
  "cw4_members",
  {
    toAdd: CW4Member[];
    toRemove: string[];
  }
>;

/** _cw3 */
export type CharityApplicationMeta = MetaConstructor<
  "cw3_application",
  Registration
>;

export type CW3ConfigUpdateMeta = MetaConstructor<
  "cw3_config",
  DiffSet<FormCW3Config>
>;

export type ReviewCW3ConfigUpdateMeta = MetaConstructor<
  "review_cw3_config",
  DiffSet<FormReviewCW3Config>
>;

export type FundSendMeta = MetaConstructor<
  "cw3_transfer",
  Pick<FundSendPayload, "amount" | "denom" | "recipient">
>;

/** _endowment */
export type WithdrawMeta = MetaConstructor<
  "acc_withdraw",
  {
    beneficiary: string;
    assets: Asset[];
  }
>;

export type EndowmentProfileUpdateMeta = MetaConstructor<
  "acc_profile",
  DiffSet<ProfileWithSettings>
>;

export type EndowmentStatusMeta = MetaConstructor<
  "acc_endow_status",
  {
    id: number;
    fromStatus: keyof EndowmentStatus;
    toStatus: EndowmentStatusStrNum;
    beneficiary?: string;
  }
>;

/** _registrar */
export type RegistrarConfigUpdateMeta = MetaConstructor<
  "reg_config",
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
  //cw4
  | CW4MemberUpdateMeta
  //cw3
  | CharityApplicationMeta
  | CW3ConfigUpdateMeta
  | ReviewCW3ConfigUpdateMeta
  | FundSendMeta
  //endowment
  | EndowmentStatusMeta
  | WithdrawMeta
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

export interface FormCW3Config {
  threshold: number;
  duration: number;
  require_execution: boolean;
}
export interface FormReviewCW3Config extends FormCW3Config {
  seed_asset?: Asset;
  seed_split_to_liquid: string; //"0.5,0.9",
  new_endow_gas_money?: Coin;
}
export type CW3ConfigValues<T extends FormCW3Config> = ProposalBase &
  T & { initial: T; isTime: boolean };

export type EndowmentUpdateValues = ProposalBase & {
  id: number;
  status: Exclude<EndowmentStatusStrNum, "0">;
  //address to transfer funds when endowment will be closed

  //beneficiary type
  beneficiaryType: "wallet" | "endowment" | "index fund";

  //beneficiary
  wallet: string;
  endowmentId: number;
  indexFund: number;

  //metadata
  prevStatus?: EndowmentStatusText;
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
  denom: string;
  haloBalance: number;
  usdBalance: number;
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

export type ProfileWithSettings = ProfileUpdate &
  Pick<EndowmentSettingsPayload, "name"> & {
    //replace categories field with flat sdgNum field
    sdg: UNSDG_NUMS;
    image: ImgLink;
    logo: ImgLink;
  };

export type FlatProfileWithSettings = Omit<
  ProfileWithSettings,
  "image" | "logo"
> & {
  image: string;
  logo: string;
};

export type ProfileFormValues = ProposalBase &
  ProfileWithSettings & {
    initial: FlatProfileWithSettings;
  };

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Pick<
  CharityApplication,
  | "CharityName"
  | "RegistrationDate"
  | "RegistrationStatus"
  | "CharityName_ContactEmail"
>;
