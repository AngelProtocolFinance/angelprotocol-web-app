import { Interface } from "@ethersproject/abi";
import queries from "./queries.json";
import txs from "./txs.json";

export const multisig = new Interface([...txs, ...queries]);
