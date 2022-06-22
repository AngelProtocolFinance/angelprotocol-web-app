import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { ContractQueryArgs } from "services/types";
import {
  CW3Config,
  CWContracts,
  CategorizedEndowments,
  DataRes,
  EndowmentEntry,
  Profile,
} from "types/server/contracts";
import { junoLcdUrl } from "constants/urls";
import contract_querier from "./contract_querier";
import { endowmentTags, junoTags, registrarTags } from "./tags";

type EndowmentListRes = {
  endowments: EndowmentEntry[];
};

interface EndowmentDetails {
  owner: string; //"cw3 owner";
  name: string;
  //..update attr on demand

  isPlaceHolder?: true;
}

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    return fetchBaseQuery({ baseUrl: junoLcdUrl })(args, api, extraOptions);
  },
  { maxRetries: 1 }
);

export const junoApi = createApi({
  reducerPath: "junoApi",
  baseQuery: customBaseQuery,
  tagTypes: [junoTags.registrar, junoTags.endowment],
  endpoints: (builder) => ({
    categorizedEndowments: builder.query<
      CategorizedEndowments,
      ContractQueryArgs
    >({
      providesTags: [
        { type: junoTags.registrar, id: registrarTags.endowments },
      ],
      query: contract_querier,
      transformResponse: (res: DataRes<EndowmentListRes>) => {
        return res.data.endowments.reduce((result, profile) => {
          if (!profile.un_sdg || profile.tier === "Level1") {
            return result;
          } else {
            if (!result[profile.un_sdg]) {
              result[profile.un_sdg] = [];
            }
            result[+profile.un_sdg!].push(profile);
            return result;
          }
        }, {} as CategorizedEndowments);
      },
    }),
    endowmentProfile: builder.query<Profile, ContractQueryArgs>({
      providesTags: [{ type: junoTags.endowment, id: endowmentTags.profile }],
      query: contract_querier,
      transformResponse: (res: DataRes<Profile>) => {
        return res.data;
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
            endowmentQueryRes.data as DataRes<EndowmentDetails>
          ).data;

          //get cw3Config
          const cw3ConfigQueryRes = await baseQuery(
            contract_querier({
              address: endowmentDetails.owner,
              msg: { config: {} },
            })
          );

          const cw3Config = (cw3ConfigQueryRes.data as DataRes<CW3Config>).data;

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

export const {
  useEndowmentProfileQuery,
  useCategorizedEndowmentsQuery,
  useEndowmentCWsQuery,
} = junoApi;
