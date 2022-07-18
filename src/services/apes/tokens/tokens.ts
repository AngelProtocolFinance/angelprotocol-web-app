import { Coin } from "@cosmjs/proto-signing";
import { Coin as TerraCoin } from "@terra-money/terra.js";
import { ethers, utils } from "ethers";
import { ProviderId, ProviderInfo } from "contexts/WalletContext/types";
import { WithBalance } from "services/types";
import { Chain, Token } from "types/server/aws";
import createAuthToken from "helpers/createAuthToken";
import { chainIDs } from "constants/chainIDs";
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
    balances: builder.query<WithBalance[], { providerInfo: ProviderInfo }>({
      providesTags: [],
      async queryFn(args, queryApi, extraOptions, baseQuery) {
        try {
          const { address, chainId } = args.providerInfo;
          const chainRes = await fetch(
            `${apes_endpoint}/chain/${args.providerInfo.chainId}`
          );

          const chain: Chain = await chainRes.json();

          // fetch balances for juno
          if (isJunoChain(chainId)) {
            const balancesRes = await fetch(
              junoLcdUrl + `/cosmos/bank/v1beta1/balances/${address}`
            );

            // returns only positive balances
            const junoBalance: JunoBalance = await balancesRes.json();

            //don't display coins with no assets
            const junoTokens = [chain.native_currency, ...chain.tokens].reduce(
              (result, coin) => {
                const balance = junoBalance.balances.find(
                  (x) => x.denom === coin.token_identifier
                );
                if (balance) {
                  result.push({
                    ...coin,
                    balance: +utils.formatUnits(balance.amount, coin.decimals),
                  });
                }
                return result;
              },
              [] as WithBalance[]
            );

            return { data: junoTokens };
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
            const terraTokens = [chain.native_currency, ...chain.tokens].reduce(
              (result, coin) => {
                const balance = terraBalance.balances.find(
                  (x) => x.denom === coin.token_identifier
                );
                if (balance) {
                  result.push({
                    ...coin,
                    balance: +utils.formatUnits(balance.amount, coin.decimals),
                  });
                }
                return result;
              },
              [] as WithBalance[]
            );

            return { data: terraTokens };
          }

          /**fetch balances for ethereum */
          const jsonProvider = new ethers.providers.JsonRpcProvider(
            chain.rpc_url,
            { chainId: +chainId, name: chain.name }
          );
          const queryResults = await jsonProvider.getBalance(address);

          const _coins: WithBalance[] = [
            {
              ...chain.native_currency,
              balance: +utils.formatUnits(
                queryResults,
                chain.native_currency.decimals
              ),
            },
          ];

          //fetch erc20 balances of activeCoin
          const erc20Tokens = chain.tokens;
          const erc20Holdings = await getERC20Holdings(
            chain.rpc_url,
            address,
            erc20Tokens.map((token) => token.token_identifier)
          );

          //convert to NativeBalanceFormat
          const transformedTokens: WithBalance[] = erc20Holdings.map(
            (token, i) => ({
              type: "erc20",
              symbol: token.symbol,
              logo: erc20Tokens[i].logo,
              decimals: token.decimals,
              chain_id: activeCoin.chain_id,

              native_symbol: activeCoin.symbol,
              contract_addr: token.contractAddress,

              balance: +token.balance,
            })
          );
          //insert ERC20 tokens with balances next to native token
          (evmCoins as WithBalance[]).splice(1, 0, ...transformedTokens);

          return { data: coins.concat(evmCoins) };
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

export const { useTokensQuery, useBalancesQuery } = tokens_api;

function isJunoChain(chainId: chainIDs) {
  switch (chainId) {
    case chainIDs.juno_main:
    case chainIDs.juno_test:
      return true;
    default:
      return false;
  }
}

function isTerraChain(chainId: chainIDs) {
  switch (chainId) {
    case chainIDs.terra_main:
    case chainIDs.terra_test:
    case chainIDs.terra_local:
      return true;
    default:
      return false;
  }
}
