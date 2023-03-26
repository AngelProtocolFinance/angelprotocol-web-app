import useSWR from "swr";
import { queryContract } from "services/juno/queryContract";
import { idParamToNum } from "helpers";
import { contracts } from "constants/contractsV2";
import { apCWs } from "./constants";

export default function useIsMemberQuery(user: string, endowmentId?: number) {
  //TODO: skip if not juno/polygon and no endowmentId
  //TODO: add keys
  return useSWR([user, endowmentId], async ([user, id]) => {
    const numId = idParamToNum(id);
    const AP = apCWs[numId];
    /** special case for ap admin usage */
    if (AP) {
      const { cw3 } = AP;
      //skip endowment query, query hardcoded cw3 straight
      const voter = await queryContract("cw3Voter", cw3, {
        addr: user,
      });
      return !!voter.weight;
    }

    const endowment = await queryContract("accEndowment", contracts.accounts, {
      id: numId,
    });

    const voter = await queryContract("cw3Voter", endowment.owner, {
      addr: user,
    });

    return !!voter.weight;
  });
}
