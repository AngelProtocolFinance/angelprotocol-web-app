import { ContractQueryArgs } from "services/types";
import { Profile, QueryRes } from "types/server/contracts";
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
  }),
});

export const { useEndowmentProfileQuery } = account_api;
