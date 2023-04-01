import endowmentCreated from "./events/endowmentCreated.json";
import endowment from "./queries/endowment.json";
import state from "./queries/state.json";
import createEndowment from "./txs/createEndowment.json";
import updateController from "./txs/updateController.json";

export const abi = [
  ...endowmentCreated,

  ...createEndowment,
  ...updateController,

  ...endowment,
  ...state,
];
