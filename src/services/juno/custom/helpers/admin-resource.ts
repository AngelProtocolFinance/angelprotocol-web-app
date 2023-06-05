import { AdminResources, MultisigConfig, PropMeta } from "../../../types";
import { queryContract } from "services/juno/queryContract";
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
  multisig: string
): Promise<[PropMeta, MultisigConfig, string[] /** members */]> {
  const [members, threshold, requireExecution] = await Promise.all([
    queryContract("multisig.members", { multisig }),
    queryContract("multisig.threshold", { multisig }),
    queryContract("multisig.require-execution", { multisig }),
    /** just set credential to none, if disconnected or non-juno wallet */
  ]);

  const tagPayloads = [customApi.util.invalidateTags(defaultProposalTags)];

  /** in the context of tx submission */
  const willExecute: true | undefined =
    threshold === 1 && !requireExecution ? true : undefined;

  const url = willExecute
    ? `${appRoutes.admin}/${endowId}`
    : `${appRoutes.admin}/${endowId}/${adminRoutes.proposals}`;
  const description = willExecute ? "Go to admin home" : "Go to proposals";
  const message = willExecute
    ? "Successful transaction"
    : "Proposal successfully created";

  return [
    {
      willExecute,
      successMeta: { message, link: { url, description } },
      tagPayloads,
    },
    { threshold, requireExecution },
    members,
  ];
}
