import {
  RegistrarConfigExtensionPayload,
  RegistrarOwnerPayload,
} from "types/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Registrar extends Contract {
  private static address = contracts.registrar;

  createEmbeddedConfigExtensionUpdateMsg(
    payload: RegistrarConfigExtensionPayload
  ) {
    return this.createEmbeddedWasmMsg(Registrar.address, {
      update_config_extension: payload,
    });
  }

  createEmbeddedOwnerUpdateMsg(payload: RegistrarOwnerPayload) {
    return this.createEmbeddedWasmMsg(Registrar.address, {
      update_owner: payload,
    });
  }
}
