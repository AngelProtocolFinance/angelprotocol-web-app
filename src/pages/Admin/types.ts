import { FundDetails } from "contracts/types";
import { Member } from "services/terra/admin/types";
import { AllianceMember as AM } from "services/terra/indexFund/types";
import {
  EndowmentStatus,
  EndowmentStatusStrNum,
} from "services/terra/registrar/types";

export enum proposalTypes {
  //index fund
  indexFund_allianceEdits = "indexFund_allianceEdit",
  indexFund_createFund = "indexFund_createFund",
  indexFund_removeFund = "indexFund_removeFund",
  indexFund_updateFundMembers = "indexFund_updateFundMembers",
  //admin group
  adminGroup_updateMembers = "adminGroup_updateMembers",
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
  | { type: proposalTypes.indexFund_allianceEdits; data: AllianceEditMeta };

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
