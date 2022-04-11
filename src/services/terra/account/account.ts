import { CWContracts } from "contracts/Admin";
import { Profile } from "services/aws/endowments/types";
import { CW3Config } from "../admin/types";
import contract_querier from "../contract_querier";
import { tags, endowment } from "../tags";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import { EndowmentDetails, Holdings } from "./types";

export const account_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    endowmentHoldings: builder.query<Holdings, ContractQueryArgs>({
      providesTags: [{ type: tags.endowment, id: endowment.holdings }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Holdings>) => {
        return res.query_result;
      },
    }),
    endowmentDetails: builder.query<EndowmentDetails, ContractQueryArgs>({
      providesTags: [{ type: tags.endowment, id: endowment.holdings }],
      query: contract_querier,
      transformResponse: (res: QueryRes<EndowmentDetails>) => {
        return res.query_result;
      },
    }),

    endowmentCWs: builder.query<CWContracts, string>({
      async queryFn(address, queryApi, extraOptions, baseQuery) {
        try {
          //get endowment details
          const endowmentQueryRes = await baseQuery(
            contract_querier({ address, msg: { endowment: {} } })
          );
          const endowmentDetails = (
            endowmentQueryRes.data as QueryRes<EndowmentDetails>
          ).query_result;

          //get cw3Config
          const cw3ConfigQueryRes = await baseQuery(
            contract_querier({
              address: endowmentDetails.owner,
              msg: { config: {} },
            })
          );

          const cw3Config = (cw3ConfigQueryRes.data as QueryRes<CW3Config>)
            .query_result;

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
      providesTags: [{ type: tags.endowment, id: endowment.profile }],
      query: contract_querier,
      transformResponse: (res: QueryRes<any>) => {
        return res.query_result;
      },
    }),
  }),
});
