import { WithdrawLockPayload } from "types/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import CW3 from ".";

export default class CW3Ap extends CW3 {
  constructor(wallet: WalletState | undefined) {
    super(wallet, contracts.cw3ApTeam);
  }

  createEmbeddedWithdrawLockMsg(payload: WithdrawLockPayload) {
    return this.createEmbeddedWasmMsg(this.address, {
      propose_locked_withdraw: payload,
    });
  }
}
