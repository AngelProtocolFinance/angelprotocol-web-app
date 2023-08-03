import { Interface } from "@ethersproject/abi";
import events from "./events.json";
import txs from "./txs.json";

export const multisig = new Interface([...txs, ...events]);
