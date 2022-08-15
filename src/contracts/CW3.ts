import {
  CW3ConfigPayload,
  EmbeddedBankMsg,
  EmbeddedWasmMsg,
  Vote,
} from "types/server/contracts";
import Contract from "./Contract";

export default class CW3 extends Contract {
  createEmbeddedUpdateConfigMsg(payload: CW3ConfigPayload) {
    return this.createEmbeddedWasmMsg([], {
      update_config: payload,
    });
  }

  createExecProposalMsg(proposal_id: number) {
    return this.createExecuteContractMsg({
      execute: {
        proposal_id,
      },
    });
  }

  createProposalMsg(
    title: string,
    description: string,
    embeddedMsgs: (EmbeddedBankMsg | EmbeddedWasmMsg)[],
    meta?: string
  ) {
    return this.createExecuteContractMsg({
      propose: {
        title,
        description,
        meta,
        msgs: embeddedMsgs,
      },
    });
  }

  createVoteMsg(proposal_id: number, vote: Vote) {
    return this.createExecuteContractMsg({
      vote: {
        proposal_id,
        vote,
      },
    });
  }
}
