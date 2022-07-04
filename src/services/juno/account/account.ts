import { ContractQueryArgs } from "services/types";
import {
  CW3Config,
  CWContracts,
  Profile,
  QueryRes,
} from "types/server/contracts";
import { endowmentTags, junoTags } from "services/juno/tags";
import { junoApi } from "..";
import contract_querier from "../contract_querier";

interface EndowmentDetails {
  owner: string; //"cw3 owner";
  name: string;
  //..update attr on demand

  isPlaceHolder?: true;
}

export const account_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    endowmentCWs: builder.query<CWContracts, string>({
      async queryFn(address, queryApi, extraOptions, baseQuery) {
        try {
          //get endowment details
          const endowmentQueryRes = await baseQuery(
            contract_querier({ address, msg: { endowment: {} } })
          );
          const endowmentDetails = (
            endowmentQueryRes.data as QueryRes<EndowmentDetails>
          ).data;

          //get cw3Config
          const cw3ConfigQueryRes = await baseQuery(
            contract_querier({
              address: endowmentDetails.owner,
              msg: { config: {} },
            })
          );

          const cw3Config = (cw3ConfigQueryRes.data as QueryRes<CW3Config>)
            .data;

          return {
            data: { cw3: endowmentDetails.owner, cw4: cw3Config.group_addr },
          };
        } catch (err) {
          return {
            error: {
              status: 500,
              statusText: "Query error",
              data: "CW contracts query failed",
            },
          };
        }
      },
    }),

    endowmentProfile: builder.query<Profile, ContractQueryArgs>({
      providesTags: [{ type: junoTags.endowment, id: endowmentTags.profile }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Profile>) => {
        return res.data;
      },
    }),
  }),
});
