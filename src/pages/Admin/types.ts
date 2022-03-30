import { Member } from "services/terra/admin/types";

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
      data: any;
    }
  | { type: proposalTypes.adminGroup_updateMembers; data: CWMemberUpdateMeta };

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
