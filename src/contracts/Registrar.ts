import { RegistrarConfigPayload, RegistrarOwnerPayload } from "types/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Registrar extends Contract {
  private static address = contracts.registrar;

  createEmbeddedConfigUpdateMsg(payload: RegistrarConfigPayload) {
    return this.createEmbeddedWasmMsg(Registrar.address, {
      update_config: payload,
    });
  }

  createEmbeddedOwnerUpdateMsg(payload: RegistrarOwnerPayload) {
    return this.createEmbeddedWasmMsg(Registrar.address, {
      update_owner: payload,
    });
  }
}
