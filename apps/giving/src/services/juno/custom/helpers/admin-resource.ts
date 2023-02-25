import { AdminResources } from "../../../types";
import { CW3Config } from "@giving/types/contracts";
import { isJunoAddress } from "schemas/tests";
import { contracts } from "constants/contracts";
import { adminRoutes, appRoutes } from "constants/routes";
import { queryContract } from "../../queryContract/index";
import { defaultProposalTags } from "../../tags";
import { customApi } from "../custom";

export const AP_ID = 0;
export const REVIEWER_ID = 0.5;

export function getCWs(id: number) {
  //TODO: atm, only two admin types, refactor this once > 2
  //charities doesn't have hardcoded cws, so only test for AP_ID && REVIEWER_ID
  const cw3 = id === AP_ID ? contracts.cw3ApTeam : contracts.cw3ReviewTeam;
  const cw4 =
    id === AP_ID ? contracts.cw4GrpApTeam : contracts.cw4GrpReviewTeam;
  const type: AdminResources["type"] = id === AP_ID ? "ap" : "review";
  return { cw3, cw4, type };
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

  const willExecute =
    /** single member */
    numVoters === 1 ||
    /** multiple members but threshold is lte 1/members given that execution is not required */
    (!config.require_execution &&
      Number(config.threshold.absolute_percentage.percentage) <= 1 / numVoters);

  const tagPayloads = [customApi.util.invalidateTags(defaultProposalTags)];

  const meta = willExecute
    ? {
        willExecute,
        successMeta: {
          message: "Successful transaction",
          link: {
            url: `${appRoutes.admin}/${endowId}`,
            description: "Go to admin home",
          },
        },
        tagPayloads,
        isAuthorized: !!voter.weight,
      }
    : {
        willExecute: undefined,
        successMeta: {
          message: "Proposal successfully created",
          link: {
            url: `${appRoutes.admin}/${endowId}/${adminRoutes.proposals}`,
            description: "Go to proposals",
          },
        },
        tagPayloads,
        isAuthorized: !!voter.weight,
      };

  return [meta, config];
}
