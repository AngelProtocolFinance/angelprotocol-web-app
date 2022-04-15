import { SuccessLink } from "services/transaction/types";
import { CWContracts } from "contracts/Admin";
import { admin, app, site } from "constants/routes";

function genProposalsLink(cws: Extract<CWContracts, "apTeam">): SuccessLink;
//when passing cw3s, prompts to also pass endomwnent addr
function genProposalsLink(
  cws: CWContracts,
  endowmentAddr: string | undefined
): SuccessLink;
function genProposalsLink(
  cws: CWContracts,
  endowmentAddr?: string
): SuccessLink {
  return {
    description: "Go to proposals",
    url: `${site.app}/${
      cws === "apTeam" ? app.admin : app.endowment_admin + "/" + endowmentAddr
    }/${admin.proposals}`,
  };
}

export default genProposalsLink;
