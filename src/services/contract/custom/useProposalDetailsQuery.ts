import useSWR, { SWRResponse } from "swr";
import { ProposalDetails } from "../../types";
import { queryContract } from "services/juno/queryContract";
import { idParamToNum } from "helpers";

export default function useProposalDetailsQuery(
  cw3: string,
  id?: string
): SWRResponse<ProposalDetails> {
  const numId = idParamToNum(id);
  return useSWR(numId !== 0 ? [numId, cw3] : null, async ([id, cw3]) => {
    const [proposal, votes] = await Promise.all([
      queryContract("cw3Proposal", cw3, { id }),
      queryContract("cw3Votes", cw3, {
        proposal_id: id,
      }),
    ]);

    return {
      ...proposal,
      votes: votes,
    };
  });
}
