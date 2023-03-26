import useSWR, { SWRResponse } from "swr";
import { AdminResources } from "services/types";
import { CW3Config } from "types/contracts";
import { queryContract } from "services/juno/queryContract";
import { useGetWallet } from "contexts/WalletContext";
import { idParamToNum } from "helpers";
import { isJunoAddress } from "schemas/tests";
import { contracts } from "constants/contractsV2";
import { adminRoutes, appRoutes } from "constants/routes";
import { apCWs } from "./constants";

export default function useAdminResourcesQuery(
  endowmentId?: string
): SWRResponse<AdminResources> {
  const { wallet } = useGetWallet();
  const user = wallet?.address;

  return useSWR(
    user && endowmentId ? [user, endowmentId] : null,
    async ([user, id]) => {
      const numId = idParamToNum(id);
      const AP = apCWs[numId];
      /** special case for ap admin usage */
      if (AP) {
        const { cw3, cw4, type } = AP;
        //skip endowment query, query hardcoded cw3 straight

        const [meta, config] = await getMeta(numId, cw3, user);
        return {
          type: type as any,
          id: numId,
          cw3,
          cw4,
          propMeta: meta,
          config,
        };
      }

      const endowment = await queryContract(
        "accEndowment",
        contracts.accounts,
        {
          id: numId,
        }
      );
      const [meta, config] = await getMeta(numId, endowment.owner, user);

      return {
        type: "charity",
        id: numId,
        cw3: endowment.owner,
        cw4: config.group_addr,
        config,
        propMeta: meta,
        ...endowment,
      };
    }
  );
}

export async function getMeta(
  endowId: number,
  cw3: string,
  user?: string
): Promise<[AdminResources["propMeta"], CW3Config]> {
  const [voters, config, voter] = await Promise.all([
    queryContract("cw3ListVoters", cw3, null),
    queryContract("cw3Config", cw3, null),
    /** just set credential to none, if disconnected or non-juno wallet */
    user && isJunoAddress(user)
      ? queryContract("cw3Voter", cw3, {
          addr: user,
        })
      : Promise.resolve({ weight: 0 }),
  ]);

  const numVoters = voters.length;
  const willExecute =
    /** single member */
    numVoters === 1 ||
    /** multiple members but threshold is lte 1/members given that execution is not required */
    (!config.require_execution &&
      Number(config.threshold.absolute_percentage.percentage) <=
        1 / numVoters) ||
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
    tagPayloads: [], //TODO: add default tags here
    isAuthorized: !!voter.weight,
  };

  return [meta, config];
}
