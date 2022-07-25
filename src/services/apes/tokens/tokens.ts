import { ethers, utils } from "ethers";
import { ProviderInfo } from "contexts/WalletContext/types";
import { Chain, Token } from "types/server/aws";
import { isJunoChain, isTerraChain } from "helpers/checkChain";
import createAuthToken from "helpers/createAuthToken";
import { UnsupportedNetworkError } from "errors/errors";
import { apes_endpoint } from "constants/urls";
import { apes } from "../apes";
import { getERC20Holdings } from "../helpers/getERC20Holdings";
import getCosmosBalances from "./getCosmosBalances";

const tokens_api = apes.injectEndpoints({
  endpoints: (builder) => ({
    tokens: builder.query<Token[], unknown>({
      query: () => {
        const generatedToken = createAuthToken("angelprotocol-web-app");
        return {
          url: "token/list",
          method: "GET",
          headers: { authorization: generatedToken },
        };
      },
    }),
    chain: builder.query<Chain, { providerInfo: ProviderInfo }>({
      providesTags: [],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          const { address, chainId } = args.providerInfo;
          const chainRes = await fetch(`${apes_endpoint}/chain/${chainId}`);

          const chain: Chain | { message: string } = await chainRes.json();

          if (!chain || "message" in chain) {
            throw new UnsupportedNetworkError(chainId);
          }

          // fetch balances for juno or terra
          if (isJunoChain(chainId) || isTerraChain(chainId)) {
            return await getCosmosBalances(chain, address);
          }

          /**fetch balances for ethereum */
          const jsonProvider = new ethers.providers.JsonRpcProvider(
            chain.rpc_url,
            { chainId: +chainId, name: chain.chain_name }
          );
          const queryResults = await jsonProvider.getBalance(address);

          chain.native_currency.balance = +utils.formatUnits(
            queryResults,
            chain.native_currency.decimals
          );

          const erc20Holdings = await getERC20Holdings(
            chain.rpc_url,
            address,
            chain.tokens.map((token) => token.token_id)
          );

          erc20Holdings.forEach((erc20) => {
            const token = chain.tokens.find(
              (x) => x.token_id === erc20.contractAddress
            );
            // token exists because getERC20Holdings returns balances only for chain.tokens
            token!.balance = +erc20.balance;
          });

          return { data: chain };
        } catch (err) {
          console.log(err);
          return {
            error: {
              status: 500,
              statusText: "Query error",
              data: "Failed to get balances",
            },
          };
        }
      },
    }),
  }),
});

export const { useTokensQuery, useChainQuery } = tokens_api;
