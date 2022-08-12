import { ContractQueryArgs } from "services/types";
import { Member } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import Contract from "./Contract";

export default class CW4 extends Contract {
  members: ContractQueryArgs;
  member: ContractQueryArgs;

  constructor(wallet: WalletState | undefined, address: string) {
    super(wallet, address);

    this.members = {
      address: this.contractAddress,
      msg: { list_members: {} },
    };

    this.member = {
      address: this.contractAddress,
      msg: { member: { addr: this.walletAddress } },
    };
  }

  createEmbeddedUpdateMembersMsg(to_add: Member[], to_remove: string[]) {
    return this.createEmbeddedWasmMsg([], {
      update_members: {
        add: to_add,
        remove: to_remove,
      },
    });
  }
}
