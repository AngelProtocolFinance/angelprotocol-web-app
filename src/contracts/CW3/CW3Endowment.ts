import { WithdrawLockPayload } from "types/contracts";
import CW3 from ".";

export default class CW3Endowment extends CW3 {
  createWithdrawProposalMsg(payload: WithdrawLockPayload) {
    return this.createExecuteContractMsg(this.address, {
      propose_locked_withdraw: payload,
    });
  }
}
