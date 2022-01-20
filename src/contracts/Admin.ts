import { MsgExecuteContract } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import { ContractQueryArgs } from "services/terra/types";
import Contract from "./Contract";
import { Member, sc, EmbeddedWasmMsg } from "./types";

export default class Admin extends Contract {
  apCW4_addr: string;
  apCW3_addr: string;
  coCW4_addr: string;
  gaCW3_addr: string;

  members: ContractQueryArgs;
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.apCW4_addr = contracts[this.chainID][sc.apCW4];
    this.apCW3_addr = contracts[this.chainID][sc.apCW3];
    this.coCW4_addr = contracts[this.chainID][sc.coCW4];
    this.gaCW3_addr = contracts[this.chainID][sc.gaCW3];

    this.members = {
      address: this.apCW4_addr,
      msg: { list_members: {} },
    };
  }

  createUpdateMembersMsg(to_add: Member[], to_remove: string[]) {
    return this.createdEmbeddedWasmMsg([], this.apCW4_addr, {
      update_members: {
        add: to_add,
        remove: to_remove,
      },
    });
  }

  async createProposalTx(
    title: string,
    description: string,
    msgs: EmbeddedWasmMsg[],
    latest?: any
  ) {
    this.checkWallet();
    const proposal_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.apCW3_addr,
      {
        propose: {
          title,
          description,
          msgs,
        },
      }
    );
    const fee = await this.estimateFee([proposal_msg]);
    return { msgs: [proposal_msg], fee };
  }

  async get_apCW4_member(addr: string) {
    return this.query<Member>(this.apCW4_addr, {
      member: { addr },
    });
  }
}
