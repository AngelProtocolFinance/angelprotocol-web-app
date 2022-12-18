import { ApplicationVote } from "types/contracts";
import { ReviewCW3ConfigPayload } from "types/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
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
