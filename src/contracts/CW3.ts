import {
  CW3ConfigPayload,
  EmbeddedBankMsg,
  EmbeddedWasmMsg,
  Vote,
} from "types/server/contracts";
import { ChainWallet } from "contexts/ChainGuard";
import Contract from "./Contract";

export default class CW3 extends Contract {
  address: string;

  constructor(chain: ChainWallet, address: string) {
    super(chain);
    this.address = address;
  }

  createEmbeddedUpdateConfigMsg(payload: CW3ConfigPayload) {
    return this.createEmbeddedWasmMsg(this.address, {
      update_config: payload,
    });
  }

  createExecProposalMsg(proposal_id: number) {
    return this.createExecuteContractMsg(this.address, {
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
    return this.createExecuteContractMsg(this.address, {
      propose: {
        title,
        description,
        meta,
        msgs: embeddedMsgs,
      },
    });
  }

  createVoteMsg(proposal_id: number, vote: Vote) {
    return this.createExecuteContractMsg(this.address, {
      vote: {
        proposal_id,
        vote,
      },
    });
  }
}
