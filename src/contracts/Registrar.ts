import { ConnectedWallet } from "@terra-money/wallet-provider";
import Contract from "./Contract";

interface SCAddresses {
  [index: string]: string;
}

export default class Registrar extends Contract {
  currContractAddr: string;
  //contract address
  static scAddresses: SCAddresses = {
    "bombay-12": "terra1eq6wrtz3arzpynap5cwf82r0ttxdh8xwe5af9w",
    localterra: "",
    "tequila-0004": "",
    "columbus-4": "",
  };

  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet: ConnectedWallet) {
    super(wallet);
    this.currContractAddr = Registrar.scAddresses[this.wallet.network.chainID];
  }

  async getConfig() {
    const res = await this.client.wasm.contractQuery(this.currContractAddr, {
      config: {},
    });
    console.log(res);
  }
}
