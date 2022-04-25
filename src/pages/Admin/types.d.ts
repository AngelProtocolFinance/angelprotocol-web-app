declare module "@types-page/admin" {
  import { proposalTypes } from "types/routes";
  import {
    AllianceMember as AM,
    EndowmentStatus,
    EndowmentStatusStrNum,
    FundConfig,
    FundDetails,
    Member,
    RegistrarConfigPayload,
    UpdateProfilePayload,
  } from "types/server/contracts";
  import { CW3ConfigPayload } from "./Templates/CW3Configurer/cw3ConfigSchema";
  import { FundSendPayload } from "./Templates/FundSender/fundSendSchema";

  //TODO: find a way to incorporate proposal group with proposal types
  export type ProposalGroup =
    | "indexfund"
    | "admin-group"
    | "endowment"
    | "registrar";

  export type ProposalMeta =
    | {
        type: proposalTypes.endowment_withdraw;
        data: WithdrawMeta;
      }
    | {
        type: proposalTypes.endowment_updateStatus;
        data: EndowmentStatusMeta;
      }
    | {
        type: proposalTypes.endowment_updateProfile;
        data: EndowmentProfileUpdateMeta;
      }
    | {
        type: proposalTypes.adminGroup_updateMembers;
        data: CWMemberUpdateMeta;
      }
    | {
        type:
          | proposalTypes.indexFund_createFund
          | proposalTypes.indexFund_removeFund;
        data: Omit<FundDetails, "id">;
      }
    | { type: proposalTypes.indexFund_allianceEdits; data: AllianceEditMeta }
    | {
        type: proposalTypes.indexFund_updateFundMembers;
        data: FundMemberUpdateMeta;
      }
    | {
        type: proposalTypes.indexFund_configUpdate;
        data: FundConfigUpdateMeta;
      }
    | {
        type: proposalTypes.indexFund_ownerUpdate;
        data: OwnerUpdateMeta;
      }
    | {
        type: proposalTypes.adminGroup_updateCW3Config;
        data: CW3ConfigUpdateMeta;
      }
    | {
        type: proposalTypes.adminGroup_fundTransfer;
        data: FundSendMeta;
      }
    | {
        type: proposalTypes.registrar_updateConfig;
        data: RegistrarConfigUpdateMeta;
      }
    | {
        type: proposalTypes.registrar_updateOwner;
        data: OwnerUpdateMeta;
      };

  export type SourcePreview = { vaultName: string; usdAmount: number };
  export interface WithdrawMeta {
    totalAmount: number;
    sourcesPreview: SourcePreview[];
    beneficiary: string;
  }

  export interface CWMemberUpdateMeta {
    toAdd: Member[];
    toRemove: string[];
  }

  export interface EndowmentStatusMeta {
    fromStatus: keyof EndowmentStatus;
    toStatus: EndowmentStatusStrNum;
    beneficiary?: string;
  }

  export interface AllianceEditMeta {
    toAddMembers: AM[];
    toRemoveMembers: AM[];
    editedMembers: AM[];
  }

  export interface FundMemberUpdateMeta {
    fundId: string;
    fundName: string;
    toRemove: string[];
    toAdd: string[];
  }

  export type FundSendMeta = Pick<
    FundSendPayload,
    "amount" | "currency" | "recipient"
  >;

  export type DiffSet<T> = [keyof T, T[keyof T], T[keyof T]][];
  export type FundConfigUpdateMeta = DiffSet<FundConfig>;
  export type CW3ConfigUpdateMeta = DiffSet<CW3ConfigPayload>;
  export type RegistrarConfigUpdateMeta = DiffSet<RegistrarConfigPayload>;
  export type EndowmentProfileUpdateMeta = DiffSet<UpdateProfilePayload>;
  export type OwnerUpdateMeta = { owner: string; newOwner: string };
}
