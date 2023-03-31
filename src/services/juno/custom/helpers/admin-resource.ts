import { AdminResources } from "services/types";
import { CW3Config } from "types/contracts";
import { queryContract } from "services/juno/queryContract";
import { isEthereumAddress } from "schemas/tests";
import { contracts } from "constants/contracts";
import { adminRoutes, appRoutes } from "constants/routes";
import { defaultProposalTags } from "../../tags";
import { customApi } from "../custom";

export const AP_ID = 0;
export const REVIEWER_ID = 0.5;

type Admins = AdminResources["type"];
const _charity: Admins = "charity";
type CWs = {
  [key: number]:
    | {
        multisig: string;
        type: Exclude<Admins, typeof _charity>;
      }
    | undefined;
};

export const apCWs: CWs = {
  [AP_ID]: {
    multisig: contracts["multisig/ap"],
    type: "ap",
  },
  [REVIEWER_ID]: {
    multisig: contracts["multisig/review"],
    type: "review",
  },
};

export async function getMeta(
  endowId: number,
  multisig: string,
  user?: string
): Promise<[AdminResources["propMeta"], CW3Config]> {
  const [members, config] = await Promise.all([
    queryContract("multisig.members", { multisig }),
    queryContract("multisig.config", { multisig }),
    /** just set credential to none, if disconnected or non-juno wallet */
  ]);

  const numMembers = members.length;
  const tagPayloads = [customApi.util.invalidateTags(defaultProposalTags)];
  const willExecute =
    /** single member */
    numMembers === 1 ||
    /** multiple members but threshold is lte 1/members given that execution is not required */
    (!config.require_execution &&
      Number(config.threshold.absolute_percentage.percentage) <=
        1 / numMembers) ||
    undefined;

  const url = willExecute
    ? `${appRoutes.admin}/${endowId}`
    : `${appRoutes.admin}/${endowId}/${adminRoutes.proposals}`;
  const description = willExecute ? "Go to admin home" : "Go to proposals";
  const message = willExecute
    ? "Successful transaction"
    : "Proposal successfully created";
  const meta = {
    willExecute,
    successMeta: { message, link: { url, description } },
    tagPayloads,
    isAuthorized: (user && isEthereumAddress(user) && user in members) || false,
  };

  return [meta, config];
}
