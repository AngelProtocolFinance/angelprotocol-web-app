import { UpdateEndowmentControllerMsg } from "types/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class SettingsController extends Contract {
  private static address = contracts.settingsController;

  createEmbeddedUpdateEndowmentControllerMsg(
    payload: UpdateEndowmentControllerMsg
  ) {
    return this.createEmbeddedWasmMsg(SettingsController.address, {
      update_endowment_controller: payload,
    });
  }
}
