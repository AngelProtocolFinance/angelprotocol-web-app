import endowmentCreated from "./events/endowmentCreated.json";
import endowment from "./queries/endowment.json";
import queries from "./queries/queries.json";
import state from "./queries/state.json";
import txs from "./txs/txs.json";

export const abi = [
  ...endowmentCreated,
  ...txs,
  ...queries,
  ...endowment,
  ...state,
];
