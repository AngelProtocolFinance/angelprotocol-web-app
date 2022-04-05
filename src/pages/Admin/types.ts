import { FundConfig, FundDetails } from "contracts/types";
import { Member } from "services/terra/admin/types";
import { AllianceMember as AM } from "services/terra/indexFund/types";
import {
  EndowmentStatus,
  EndowmentStatusStrNum,
} from "services/terra/registrar/types";
import { CW3ConfigValues } from "./Templates/CW3Configurer/cw3ConfigSchema";

export enum proposalTypes {
  //index fund
  indexFund_allianceEdits = "indexFund_allianceEdit",
  indexFund_createFund = "indexFund_createFund",
  indexFund_removeFund = "indexFund_removeFund",
  indexFund_updateFundMembers = "indexFund_updateFundMembers",
  indexFund_configUpdate = "indexFund_configUpdate",
  //admin group
  adminGroup_updateMembers = "adminGroup_updateMembers",
  adminGroup_updateCW3Config = "adminGroup_updateCW3Config",
  //endowment
  endowment_updateStatus = "endowment_updateStatus",
  endowment_withdraw = "endowment_withdraw",
}

export type ProposalMeta =
  | {
      type: proposalTypes.endowment_withdraw;
      data: WithdrawMeta;
    }
  | {
      type: proposalTypes.endowment_updateStatus;
      data: EndowmentStatusMeta;
    }
  | { type: proposalTypes.adminGroup_updateMembers; data: CWMemberUpdateMeta }
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
      type: proposalTypes.adminGroup_updateCW3Config;
      data: CW3ConfigUpdateMeta;
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

export interface FundConfigUpdateMeta {
  prevConfig: FundConfig;
  nextConfig: FundConfig;
}

export interface CW3ConfigUpdateMeta {
  prevConfig: Pick<CW3ConfigValues, "height" | "threshold">;
  nextConfig: Pick<CW3ConfigValues, "height" | "threshold">;
}
