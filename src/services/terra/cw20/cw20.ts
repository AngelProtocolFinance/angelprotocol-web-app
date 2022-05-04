import { Dec } from "@terra-money/terra.js";
import contract_querier from "../contract_querier";
import { cw20, tags } from "../tags";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";

//CW20 token
export type CW20Balance = {
  balance: string;
};
export type CW20Info = {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
};

export const cw20_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    CW20Info: builder.query<CW20Info, ContractQueryArgs>({
      providesTags: [{ type: tags.cw20, id: cw20.info }],
      query: contract_querier,
      transformResponse: (res: QueryRes<CW20Info>) => {
        return res.query_result;
      },
    }),
    CW20Balance: builder.query<number, ContractQueryArgs>({
      providesTags: [{ type: tags.cw20, id: cw20.balance }],
      query: contract_querier,
      transformResponse: (res: QueryRes<CW20Balance>) => {
        return new Dec(res.query_result.balance).div(1e6).toNumber();
      },
    }),
  }),
});
