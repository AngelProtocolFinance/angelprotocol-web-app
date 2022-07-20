import { Coin } from "@cosmjs/proto-signing";
import { Coin as TerraCoin } from "@terra-money/terra.js";
import { ethers, utils } from "ethers";
import { ProviderInfo } from "contexts/WalletContext/types";
import { Chain, Token } from "types/server/aws";
import { isJunoChain, isTerraChain } from "helpers/checkChain";
import createAuthToken from "helpers/createAuthToken";
import { WrongNetworkError } from "errors/errors";
import { junoChainId } from "constants/chainIDs";
import { apes_endpoint, junoLcdUrl, terraLcdUrl } from "constants/urls";
import { apes } from "../apes";
import { getERC20Holdings } from "../helpers/getERC20Holdings";

type TerraBalanceRes = { balances: TerraCoin.Data[] };
type JunoBalance = { balances: Coin[] };

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
          const chainRes = await fetch(
            `${apes_endpoint}/chain/${args.providerInfo.chainId}`
          );

          const chain: Chain | { message: string } = await chainRes.json();

          if (!chain || "message" in chain) {
            throw new WrongNetworkError("Juno", junoChainId);
          }

          // fetch balances for juno
          if (isJunoChain(chainId)) {
            const balancesRes = await fetch(
              junoLcdUrl + `/cosmos/bank/v1beta1/balances/${address}`
            );

            // returns only positive balances
            const junoBalance: JunoBalance = await balancesRes.json();

            //don't display coins with no assets
            [chain.native_currency, ...chain.tokens].forEach((coin) => {
              const balance = junoBalance.balances.find(
                (x) => x.denom === coin.token_id
              );
              if (balance) {
                coin.balance = +utils.formatUnits(
                  balance.amount,
                  coin.decimals
                );
              }
            });

            return { data: chain };
          }

          /**fetch balances for terra  */
          if (isTerraChain(chainId)) {
            //fetch native terra coins
            const res = await fetch(
              terraLcdUrl + `/cosmos/bank/v1beta1/balances/${address}`
            );

            // returns only positive balances
            const terraBalance: TerraBalanceRes = await res.json();

            //don't display coins with no assets
            [chain.native_currency, ...chain.tokens].forEach((coin) => {
              const balance = terraBalance.balances.find(
                (x) => x.denom === coin.token_id
              );
              if (balance) {
                coin.balance = +utils.formatUnits(
                  balance.amount,
                  coin.decimals
                );
              }
            });

            return { data: chain };
          }

          /**fetch balances for ethereum */
          const jsonProvider = new ethers.providers.JsonRpcProvider(
            chain.rpc_url,
            { chainId: +chainId, name: chain.name }
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

          chain.tokens.forEach((token) => {
            const erc20Token = erc20Holdings.find(
              (x) => x.contractAddress === token.token_id
            );
            if (erc20Token) {
              token.balance = +erc20Token.balance;
            }
          });

          return { data: chain };
        } catch (err) {
          console.log(err);
          return {
            error: {
              status: 500,
              statusText: "Query error",
              data: "Failed to get ethereum balances",
            },
          };
        }
      },
    }),
  }),
});

export const { useTokensQuery, useChainQuery } = tokens_api;
