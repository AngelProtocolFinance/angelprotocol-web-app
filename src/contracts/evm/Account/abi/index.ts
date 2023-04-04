import endowmentCreated from "./events/endowmentCreated.json";
import endowment from "./queries/endowment.json";
import state from "./queries/state.json";
import txs from "./txs/txs.json";

export const abi = [...endowmentCreated, ...txs, ...endowment, ...state];
