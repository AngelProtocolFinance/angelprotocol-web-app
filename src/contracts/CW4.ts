import { Member } from "types/server/contracts";
import Contract from "./Contract";

export default class CW4 extends Contract {
  createEmbeddedUpdateMembersMsg(to_add: Member[], to_remove: string[]) {
    return this.createEmbeddedWasmMsg([], {
      update_members: {
        add: to_add,
        remove: to_remove,
      },
    });
  }
}
