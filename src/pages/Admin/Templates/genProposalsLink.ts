import { SuccessLink } from "slices/transaction/types";
import { CWContracts } from "types/server/contracts";
import { adminRoutes, appRoutes } from "constants/routes";

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
    url: `${
      cws === "apTeam"
        ? appRoutes.admin
        : appRoutes.endowment_admin + "/" + endowmentAddr
    }/${adminRoutes.proposals}`,
  };
}

export default genProposalsLink;
