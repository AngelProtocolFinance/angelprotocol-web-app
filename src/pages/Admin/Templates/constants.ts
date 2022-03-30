import { admin, app, site } from "constants/routes";
import { SuccessLink } from "services/transaction/types";

export const proposalSuccessLink: SuccessLink = {
  url: `${site.app}/${app.admin}/${admin.proposals}`,
  description: "Go to proposals",
};

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
