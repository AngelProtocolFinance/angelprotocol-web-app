import { AccAddress, LCDClient } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { urls } from "App/chains";
import { chains } from "contracts/types";

export default class Querier {
  wallet?: ConnectedWallet;
  chainID: string;
  url: string;
  client: LCDClient;

  constructor(wallet?: ConnectedWallet) {
    this.wallet = wallet;
    this.chainID = wallet?.network.chainID || chains.mainnet;
    this.url = wallet?.network.lcd || urls[chains.mainnet];
    this.client = new LCDClient({ chainID: this.chainID, URL: this.url });
  }

  async query<T>(source: AccAddress, message: object) {
    return this.client.wasm.contractQuery<T>(source, message);
  }
}
