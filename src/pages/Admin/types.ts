import { proposalTypes } from "constants/routes";
import { FundConfig, FundDetails } from "contracts/types";
import { Member } from "services/terra/admin/types";
import { AllianceMember as AM } from "services/terra/indexFund/types";
import {
  EndowmentStatus,
  EndowmentStatusStrNum,
} from "services/terra/registrar/types";
import { CW3ConfigPayload } from "./Templates/CW3Configurer/cw3ConfigSchema";

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
  prevConfig: CW3ConfigPayload;
  nextConfig: CW3ConfigPayload;
}
