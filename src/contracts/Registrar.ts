import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import Contract from "./Contract";

export default class Registrar extends Contract {
  address: string;
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.address = contracts[this.chainID][sc.registrar];
  }
}
