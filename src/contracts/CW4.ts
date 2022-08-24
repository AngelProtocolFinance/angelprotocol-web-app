import { Member } from "types/server/contracts";
import { VerifiedChain } from "contexts/ChainGuard";
import Contract from "./Contract";

export default class CW4 extends Contract {
  address: string;

  constructor(chain: VerifiedChain, address: string) {
    super(chain);
    this.address = address;
  }

  createEmbeddedUpdateMembersMsg(to_add: Member[], to_remove: string[]) {
    return this.createEmbeddedWasmMsg(this.address, {
      update_members: {
        add: to_add,
        remove: to_remove,
      },
    });
  }
}
