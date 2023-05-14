import { Interface } from "@ethersproject/abi";
import balance from "./balance.json";
import txs from "./txs.json";

export const giftCard = new Interface([...balance, ...txs]);
