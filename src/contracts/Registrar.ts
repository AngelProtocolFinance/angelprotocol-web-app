import { ConnectedWallet } from "@terra-money/wallet-provider";
import Contract from "./Contract";
import { chains, ContractAddrs, Endowments, SplitRes } from "./types";

export default class Registrar extends Contract {
  address: string;
  //contract address
  static scAddresses: ContractAddrs = {
    [chains.mainnet]: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",
    [chains.testnet]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",
    [chains.localterra]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",
  };

  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.address = Registrar.scAddresses[this.chainID];
  }

  async getConfig() {
    const result = await this.query<SplitRes>(this.address, {
      config: {},
    });
    return result.split_to_liquid;
  }

  async getEndowmentList() {
    const result = await this.query<Endowments>(this.address, {
      endowment_list: {},
    });
    return result.endowments;
  }
}
