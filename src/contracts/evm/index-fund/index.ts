import { Interface } from "@ethersproject/abi";
import { FundDetails } from "services/contract/queryContract/decoded-types";
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
  decode: (result: string): FundDetails[] =>
    iface.decodeFunctionResult(fundsQuery, result)[0],
};
