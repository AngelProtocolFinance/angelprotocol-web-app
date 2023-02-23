import { AdminResources } from "services/types";
import { CW3Config } from "types/contracts";
import { queryContract } from "services/juno/queryContract";
import { isJunoAddress } from "schemas/tests";
import { contracts } from "constants/contracts";
import { adminRoutes, appRoutes } from "constants/routes";
import { defaultProposalTags } from "../../tags";
import { customApi } from "../custom";

export const AP_ID = 0;
export const REVIEWER_ID = 0.5;

const CONTRACTS = {
  AP: {
    cw3: contracts.cw3ApTeam,
    cw4: contracts.cw4GrpApTeam,
    type: "ap",
  },
  REVIEWER: {
    cw3: contracts.cw3ReviewTeam,
    cw4: contracts.cw4GrpReviewTeam,
    type: "review",
  },
};

export function getCWs(id: number) {
  return isAp(id) ? CONTRACTS.AP : CONTRACTS.REVIEWER;
}

export function isAp(id: number) {
  return id === AP_ID || id === REVIEWER_ID;
}

export async function getMeta(
  endowId: number,
  cw3: string,
  user?: string
): Promise<[AdminResources["propMeta"], CW3Config]> {
  const [votersRes, config, voter] = await Promise.all([
    queryContract("cw3ListVoters", cw3, null),
    queryContract("cw3Config", cw3, null),
    /** just set credential to none, if disconnected or non-juno wallet */
    user && isJunoAddress(user)
      ? queryContract("cw3Voter", cw3, {
          addr: user,
        })
      : Promise.resolve({ weight: 0 }),
  ]);

  const numVoters = votersRes.voters.length;
  const tagPayloads = [customApi.util.invalidateTags(defaultProposalTags)];
  const willExecute =
    /** single member */
    numVoters === 1 ||
    /** multiple members but threshold is lte 1/members given that execution is not required */
    (!config.require_execution &&
      Number(config.threshold.absolute_percentage.percentage) <= 1 / numVoters);
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
    isAuthorized: !!voter.weight,
  };

  return [meta, config];
}
