import { ConnectedWallet } from "@terra-money/wallet-provider";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import Contract from "./Contract";
import { Endowments, SplitRes } from "./types";

export default class Registrar extends Contract {
  address: string;
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.address = contracts[this.chainID][sc.registrar];
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
  async getEndowmentDetails(address: string) {
    const result = await this.query<Endowments>(this.address, {
      endowment: { address: address },
    });
    return result.endowments;
  }

  async createUpdateEndowmentTx(status: number, endowment_addr: string) {
    console.log("args: ", endowment_addr, status);
    this.checkWallet();
    const msg = new MsgExecuteContract(this.walletAddr!, this.address, {
      update_endowment_status: {
        endowment_addr,
        status,
        beneficiary: this.walletAddr,
      },
    });
    const fee = await this.estimateFee([msg]);
    return { msgs: [msg], fee };
  }
}
