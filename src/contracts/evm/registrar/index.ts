import { Interface } from "@ethersproject/abi";
import config from "./abi/config.json";
import { queries } from "./abi/queries";
import txs from "./abi/txs.json";

export const registrar = new Interface([...queries, ...config, ...txs]);
