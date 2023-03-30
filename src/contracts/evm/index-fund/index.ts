import { Interface } from "@ethersproject/abi";
import type { BigNumberish } from "@ethersproject/bignumber";
import { Tupleable } from "types/evm";
import { toTuple } from "helpers";
import abi from "./abi.json";

const iface = new Interface(abi);
const fundsQuery = iface.getFunction("queryFundsList");

interface PageOptions extends Tupleable {
  startAfter: number;
  limit: number;
}
export const funds = {
  encode: (options: PageOptions) =>
    iface.encodeFunctionData(fundsQuery, toTuple(options)),
  parse(result: string) {
    const [balance] = iface.decodeFunctionResult(fundsQuery, result);

    //just convert to string, let consumer condense
    return (balance as BigNumberish).toString();
  },
};
