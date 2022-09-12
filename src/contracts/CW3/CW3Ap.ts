import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import CW3 from ".";

export default class CW3Ap extends CW3 {
  private static address = contracts.cw3ApTeam;

  constructor(wallet: WalletState | undefined) {
    super(wallet, CW3Ap.address);
  }
}
