import { SettingsControllerUpdate } from "types/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class SettingsController extends Contract {
  private static address = contracts["accounts"];

  createEmbeddedUpdateEndowmentControllerMsg(
    payload: SettingsControllerUpdate
  ) {
    return this.createEmbeddedWasmMsg(SettingsController.address, {
      update_endowment_controller: payload,
    });
  }

  createUpdateEndowmentControllerMsg(payload: SettingsControllerUpdate) {
    return this.createExecuteContractMsg(SettingsController.address, {
      update_endowment_controller: payload,
    });
  }
}
