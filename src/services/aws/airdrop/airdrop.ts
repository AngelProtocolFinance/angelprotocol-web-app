import { aws } from "../aws";
import { terra_lcds } from "constants/urls";
import { chainIDs, sc } from "contracts/types";
import { contracts } from "constants/contracts";
import { Airdrops, ClaimInquiry, QueryArg } from "./types";
import { QueryRes } from "services/terra/types";

const airdrop_api = aws.injectEndpoints({
  endpoints: (build) => ({
    airdrop: build.query<Airdrops, QueryArg>({
      async queryFn(
        { wallet_addr, is_test },
        queryApi,
        extraOptions,
        baseQuery
      ) {
        try {
          const chainId = is_test ? chainIDs.testnet : chainIDs.mainnet;
          const terra_endpoint = terra_lcds[chainId];
          const airdrop_addr = contracts[chainId][sc.airdrop];

          //append baseURL in aws
          const airdrops_res = await baseQuery(
            `airdrop/${wallet_addr}/${chainId}`
          );

          const airdrops = airdrops_res.data as Airdrops;

          const claimables: Airdrops = [];
          for (const airdrop of airdrops) {
            const msg = btoa(
              JSON.stringify({
                is_claimed: {
                  stage: airdrop.stage,
                  address: wallet_addr,
                },
              })
            );
            const claim_res = await fetch(
              `${terra_endpoint}/terra/wasm/v1beta1/contracts/${airdrop_addr}/store?query_msg=${msg}`
            );
            const claim_inq =
              (await claim_res.json()) as QueryRes<ClaimInquiry>;
            if (claim_inq.query_result.is_claimed) {
              continue;
            } else {
              claimables.push(airdrop);
            }
          }
          return { data: claimables };
        } catch (err) {
          console.error(err);
          return {
            error: {
              status: 500,
              statusText: "Query error",
              data: "Airdrop custom query encountered an error",
            },
          };
        }
      },
    }),
  }),
});

export const { useAirdropQuery } = airdrop_api;
