import {
  ContractQueryArgs,
  QueryRes,
  lbpTags,
  terraTags,
} from "types/services/terra";
import {
  PairInfo,
  Pool,
  PoolBalance,
  Simulation,
} from "types/services/terra/lp";
import contract_querier from "../contract_querier";
import { terra } from "../terra";

export const lp_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    donors: builder.query<any, any>({
      query: () => "alliance",
      transformResponse: (res: any) => {},
    }),
    pool: builder.query<PoolBalance, ContractQueryArgs>({
      providesTags: [{ type: terraTags.lbp, id: lbpTags.pool }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Pool>) => {
        const pool = res.query_result;
        return {
          token: pool.assets[0].amount,
          native_token: pool.assets[1].amount,
        };
      },
    }),
    pairInfo: builder.query<PairInfo, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<PairInfo>) => {
        return res.query_result;
      },
    }),
    pairSimul: builder.query<Simulation, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<Simulation>) => {
        return res.query_result;
      },
    }),
  }),
});
