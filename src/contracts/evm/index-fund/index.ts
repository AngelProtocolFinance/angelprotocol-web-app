import { Interface } from "@ethersproject/abi";
import queryConfig from "./queries/config.json";
import fundDetails from "./queries/fund.json";
import queries from "./queries/queries.json";
import txs from "./txs.json";

export const indexFund = new Interface([
  ...queries,
  ...queryConfig,
  ...fundDetails,
  ...txs,
]);
