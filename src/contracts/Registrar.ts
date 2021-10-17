import { ConnectedWallet } from "@terra-money/wallet-provider";
import Contract from "./Contract";
import {
  chains,
  ContractAddrs,
  Endowment,
  Endowments,
  SplitConfig,
  SplitRes,
} from "./types";

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

  static async getConfig(chainID?: string, url?: string): Promise<SplitConfig> {
    const _chain = chainID || chains.mainnet;
    const contract = Registrar.scAddresses[_chain];
    const result = await this.queryContract<SplitRes>(chainID, url, contract, {
      config: {},
    });
    return result.split_to_liquid;
  }

  static async getEndowmentList(
    chainID?: string,
    url?: string
  ): Promise<Endowment[]> {
    const _chain = chainID || chains.mainnet;
    const contract = Registrar.scAddresses[_chain];
    const result = await this.queryContract<Endowments>(
      chainID,
      url,
      contract,
      {
        endowment_list: {},
      }
    );

    return result.endowments;
  }
}
