import { Interface } from "@ethersproject/abi";
import queryConfig from "./queries/config.json";
import fundDetails from "./queries/fund.json";
import txs from "./txs.json";

export const indexFund = new Interface([
  ...queryConfig,
  ...fundDetails,
  ...txs,
]);
