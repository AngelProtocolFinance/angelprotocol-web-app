import { CWContracts } from "contracts/Admin";
import { CW3Config } from "../admin/types";
import contract_querier from "../contract_querier";
import { terra } from "../terra";
import { QueryRes } from "../types";
import { EndowmentDetails } from "./types";

export const account_api = terra.injectEndpoints({
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
  }),
});
