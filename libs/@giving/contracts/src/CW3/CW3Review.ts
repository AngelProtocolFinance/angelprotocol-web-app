import { contracts } from "@giving/constants/contracts";
import { WalletState } from "@giving/contexts/wallet-context";
import { ApplicationVote } from "@giving/types/contracts";
import { ReviewCW3ConfigPayload } from "@giving/types/contracts";
import CW3 from ".";

export default class CW3Review extends CW3 {
  constructor(wallet: WalletState | undefined) {
    super(wallet, contracts.cw3ReviewTeam);
  }

  createVoteApplicationMsg(payload: ApplicationVote) {
    return this.createExecuteContractMsg(this.address, {
      vote_application: payload,
    });
  }

  createEmbeddedUpdateConfigMsg(payload: ReviewCW3ConfigPayload) {
    return this.createEmbeddedWasmMsg(this.address, {
      update_config: payload,
    });
  }
}
