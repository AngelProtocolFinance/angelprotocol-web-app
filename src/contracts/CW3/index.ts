import {
  CW3ConfigPayload,
  EmbeddedBankMsg,
  EmbeddedWasmMsg,
  Vote,
} from "types/contracts";
import { WalletState } from "contexts/WalletContext";
import Contract from "../Contract";

export default class CW3 extends Contract {
  address: string;

  constructor(wallet: WalletState | undefined, address: string) {
    super(wallet);
    this.address = address;
  }

  createEmbeddedUpdateConfigMsg(payload: CW3ConfigPayload) {
    return this.createEmbeddedWasmMsg(this.address, {
      update_config: payload,
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
