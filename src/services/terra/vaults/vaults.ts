import { terra } from "../terra";
import { terra_lcds } from "constants/urls";
import { denoms } from "constants/currency";
import { chainIDs } from "constants/chainIDs";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import { QueryRes } from "services/terra/types";
import { ExchangeInfo, ExchangeMap } from "./types";

export const vault_api = terra.injectEndpoints({
  endpoints: (build) => ({
    exchangeRate: build.query<ExchangeMap, boolean>({
      async queryFn(is_test) {
        try {
          const chainId = is_test ? chainIDs.testnet : chainIDs.mainnet;
          const terra_endpoint = terra_lcds[chainId];

          //add other vaults in the future
          const anchor_vault1_addr = contracts[chainId][sc.anchor_vault1];
          const anchor_vault2_addr = contracts[chainId][sc.anchor_vault2];

          const msg = btoa(
            JSON.stringify({
              exchange_rate: { input_denom: denoms.uusd },
            })
          );

          const exchange_res = await fetch(
            `${terra_endpoint}/terra/wasm/v1beta1/contracts/${anchor_vault1_addr}/store?query_msg=${msg}`
          );

          const exchange_info =
            (await exchange_res.json()) as QueryRes<ExchangeInfo>;

          const exchange_map = {
            [anchor_vault1_addr]: exchange_info.query_result.exchange_rate,
            [anchor_vault2_addr]: exchange_info.query_result.exchange_rate,
          };

          return { data: exchange_map };
        } catch (err) {
          return {
            error: {
              status: 500,
              statusText: "Query error",
              data: "Failed to get swap rates",
            },
          };
        }
      },
    }),
  }),
});
