import endowmentCreated from "./events/endowmentCreated.json";
import endowment from "./queries/endowment.json";
import state from "./queries/state.json";
import createEndowment from "./txs/createEndowment.json";

export default [
  ...createEndowment,

  ...endowmentCreated,

  ...endowment,
  ...state,
];
