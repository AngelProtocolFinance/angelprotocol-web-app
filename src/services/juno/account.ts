import { ContractQueryArgs } from "services/types";
import { BalanceInfo, Profile, QueryRes } from "types/server/contracts";
import { endowmentTags, junoTags } from "services/juno/tags";
import { junoApi } from ".";
import contract_querier from "./contract_querier";

export const account_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    endowmentProfile: builder.query<Profile, ContractQueryArgs>({
      providesTags: [{ type: junoTags.endowment, id: endowmentTags.profile }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Profile>) => {
        return res.data;
      },
    }),
    balance: builder.query<BalanceInfo, ContractQueryArgs>({
      providesTags: [{ type: junoTags.endowment, id: endowmentTags.profile }],
      query: contract_querier,
      transformResponse: (res: QueryRes<BalanceInfo>) => {
        return res.data;
      },
    }),
  }),
});

export const { useEndowmentProfileQuery, useBalanceQuery } = account_api;
