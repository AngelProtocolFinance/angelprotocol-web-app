import { admin, app, site } from "constants/routes";
import { SuccessLink } from "services/transaction/types";

export const proposalSuccessLink: SuccessLink = {
  url: `${site.app}/${app.admin}/${admin.proposals}`,
  description: "Go to proposals",
};
