import { Interface } from "@ethersproject/abi";
import config from "./abi/config.json";

export const registrar = new Interface([...config]);
