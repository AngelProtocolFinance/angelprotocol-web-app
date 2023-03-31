import { Interface } from "@ethersproject/abi";
import { DecodedGiftCardBalance } from "services/contract/queryContract/decoded-types";
import abi from "./abi.json";

const iface = new Interface(abi);
const balanceQuery = iface.getFunction("queryBalance");

export const balance = {
  encode: (address: string) =>
    iface.encodeFunctionData(balanceQuery, [address]),
  decode: (result: string): DecodedGiftCardBalance =>
    iface.decodeFunctionResult(balanceQuery, result)[0],
};
