import { CWContracts } from "@types-server/contracts";
import { SuccessLink } from "@types-slice/transaction";
import { adminRoutes, appRoutes, siteRoutes } from "types/routes";

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
    url: `${siteRoutes.app}/${
      cws === "apTeam"
        ? appRoutes.admin
        : appRoutes.endowment_admin + "/" + endowmentAddr
    }/${adminRoutes.proposals}`,
  };
}

export default genProposalsLink;
