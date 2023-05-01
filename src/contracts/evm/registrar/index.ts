import { Interface } from "@ethersproject/abi";
import config from "./abi/config.json";
import txs from "./abi/txs.json";

export const registrar = new Interface([...config, ...txs]);
