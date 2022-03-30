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

export type ProposalPreviews = { [key in proposalTypes]: any };

export type SourcePreview = { vaultName: string; usdAmount: string };
export interface WithdrawPreview {
  totalAmount: string;
  sourcesPreview: SourcePreview[];
  beneficiary: string;
}
