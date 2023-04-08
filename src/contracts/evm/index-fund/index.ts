import { Interface } from "@ethersproject/abi";
import queries from "./queries.json";
import txs from "./txs.json";

export const indexFund = new Interface([...queries, ...txs]);
