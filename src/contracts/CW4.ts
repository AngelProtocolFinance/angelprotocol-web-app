import { CW4Member } from "types/contracts";
import { WalletState } from "contexts/WalletContext";
import Contract from "./Contract";

export default class CW4 extends Contract {
  address: string;

  constructor(wallet: WalletState | undefined, address: string) {
    super(wallet);
    this.address = address;
  }

  createEmbeddedUpdateMembersMsg(to_add: CW4Member[], to_remove: string[]) {
    return this.createEmbeddedWasmMsg(this.address, {
      update_members: {
        add: to_add,
        remove: to_remove,
      },
    });
  }
}
