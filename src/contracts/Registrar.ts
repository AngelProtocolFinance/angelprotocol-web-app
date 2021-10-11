import { ConnectedWallet } from "@terra-money/wallet-provider";
import Contract from "./Contract";
import { chains, ContractAddrs } from "./types";

type SplitConfig = { max: string; min: string; default: string };
interface SplitRes {
  split_to_liquid: SplitConfig;
}

export default class Registrar extends Contract {
  currContractAddr: string;
  //contract address
  static scAddresses: ContractAddrs = {
    [chains.mainnet]: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",
    [chains.testnet]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",
    [chains.localterra]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",
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
