import { BigNumber } from "@ethersproject/bignumber";
import { ResultDecoder } from "../types";
import { Queries, QueryType } from "./types";

export const RESULT_DECODERS: {
  [key in QueryType]: ResultDecoder<Queries[key]["result"]>;
} = {
  balance: (result, iface) => {
    const decoded: BigNumber = iface.decodeFunctionResult(
      "balanceOf",
      result
    )[0];
    return decoded.toString();
  },
};
