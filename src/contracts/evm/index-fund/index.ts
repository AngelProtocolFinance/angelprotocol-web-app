import { Interface } from "@ethersproject/abi";
import queryConfig from "./queries/config.json";
import queryFundsList from "./queries/funds-list.json";
import queries from "./queries/queries.json";
import txs from "./txs.json";

export const indexFund = new Interface([
  ...queries,
  ...queryConfig,
  ...queryFundsList,
  ...txs,
]);
