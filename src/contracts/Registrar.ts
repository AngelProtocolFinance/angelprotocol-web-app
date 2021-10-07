import { ConnectedWallet } from "@terra-money/wallet-provider";
import Contract from "./Contract";

interface SCAddresses {
  [index: string]: string;
}

type SplitConfig = { max: string; min: string; default: string };
interface SplitRes {
  split_to_liquid: SplitConfig;
}

export default class Registrar extends Contract {
  currContractAddr: string;
  //contract address
  static scAddresses: SCAddresses = {
    "bombay-12": "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",
    localterra: "",
    "tequila-0004": "",
    "columbus-4": "",
  };

  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet: ConnectedWallet) {
    super(wallet);
    this.currContractAddr = Registrar.scAddresses[this.wallet.network.chainID];
  }

  async getConfig(): Promise<SplitConfig> {
    const res = await this.client.wasm.contractQuery<SplitRes>(
      this.currContractAddr,
      {
        config: {},
      }
    );
    return res.split_to_liquid;
  }
}
