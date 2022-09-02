import {
  RegistrarConfigPayload,
  RegistrarOwnerPayload,
  StatusChangePayload,
} from "types/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Registrar extends Contract {
  private static address = contracts.registrar;

  createEmbeddedChangeEndowmentStatusMsg(payload: StatusChangePayload) {
    return this.createEmbeddedWasmMsg(Registrar.address, {
      update_endowment_status: payload,
    });
  }

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
