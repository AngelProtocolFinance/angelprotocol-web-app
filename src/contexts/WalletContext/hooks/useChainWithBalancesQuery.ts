import { Coin } from "@cosmjs/proto-signing";
import { ethers, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { ProviderInfo } from "../types";
import { Chain } from "types/aws";
import { useChainQuery } from "services/apes";
import { queryContract } from "services/juno/queryContract";
import { WalletDisconnectedError, WrongNetworkError } from "errors/errors";
import { EXPECTED_NETWORK_TYPE } from "constants/env";
import { useErrorContext } from "../../ErrorContext";
import { placeholderChain } from "../constants";
import { getERC20Holdings } from "../helpers/getERC20Holdings";

type Result = { chain: Chain; isLoading: boolean };

export function useChainWithBalancesQuery(
  activeProviderInfo: ProviderInfo | undefined,
  disconnect: () => void
): Result {
  const [chainWithBalance, setChainWithBalance] = useState(placeholderChain);

  const {
    data: chain,
    isLoading: isChainLoading,
    isFetching: isChainFetching,
    error,
  } = useChainQuery(activeProviderInfo?.chainId ?? "", {
    skip: !activeProviderInfo,
  });

  const isLoading = isChainLoading || isChainFetching;

  useVerifyChain(activeProviderInfo, chain, isLoading, error, disconnect);

  useEffect(() => {
    if (isLoading || !activeProviderInfo || !chain) {
      return;
    }

    (async function () {
      // tokens & native_currency need to be copied separately, otherwise
      // the balance will not be settable (due to the returned `chain` not being modifiable)
      const result: Chain = {
        ...chain,
        native_currency: {
          ...chain.native_currency,
        },
        tokens: chain.tokens.map((t) => ({ ...t })),
      };

      const { address, chainId } = activeProviderInfo;

      // fetch balances for juno or terra
      if (chain.type === "juno-native" || chain.type === "terra-native") {
        const balancesRes = await fetch(
          chain.lcd_url + `/cosmos/bank/v1beta1/balances/${address}`
        );

        // returns only positive balances
        const { balances: nativeBalances }: { balances: Coin[] } =
          await balancesRes.json();

        // checking providerId to know which specific wallet is connected
        // this way once Terra v2 is enabled on Keplr again, the users will be able to
        // fetch their balances even when using Keplr
        const cw20Balances = await getCW20Balance(chain, address);

        const allBalances = nativeBalances.concat(cw20Balances);

        [result.native_currency, ...result.tokens].forEach((token) => {
          const balance = allBalances.find((x) => x.denom === token.token_id);
          token.balance = +utils.formatUnits(
            balance?.amount ?? 0,
            token.decimals
          );
        });
      } else {
        /**fetch balances for ethereum */
        const jsonProvider = new ethers.providers.JsonRpcProvider(
          chain.rpc_url,
          {
            chainId: +chainId,
            name: chain.chain_name,
          }
        );
        const queryResults = await jsonProvider.getBalance(address);

        const erc20Holdings = await getERC20Holdings(
          chain.rpc_url,
          address,
          chain.tokens.map((token) => token.token_id)
        );

        result.native_currency.balance = +utils.formatUnits(
          queryResults,
          chain.native_currency.decimals
        );

        result.tokens.forEach((token) => {
          const erc20 = erc20Holdings.find(
            (x) => x.contractAddress === token.token_id
          );
          token.balance = +(erc20?.balance ?? 0); // erc20 balance is already in decimal format
        });
      }

      setChainWithBalance(result);
    })();
  }, [activeProviderInfo, chain, isLoading]);

  return {
    chain: chainWithBalance,
    isLoading,
  };
}

function useVerifyChain(
  activeProviderInfo: ProviderInfo | undefined,
  chain: Chain | undefined,
  isLoading: boolean,
  chainError: any,
  disconnect: () => void
) {
  const { handleError } = useErrorContext();

  const handle = useCallback(
    (error: any) => {
      handleError(error);
      try {
        disconnect();
      } catch (err) {
        // when wallet is disconnected, the `disconnect` func is recreated,
        // causing this hook to rerun and throwing the error below.
        // We ignore this error and rethrow others
        if (!(err instanceof WalletDisconnectedError)) {
          handleError(err);
        }
      }
    },
    [handleError, disconnect]
  );

  useEffect(() => {
    // no active provider === no connected wallet so no need to run hook
    if (isLoading || !activeProviderInfo || !chain) {
      return;
    }
    if (chainError) {
      handle(chainError);
    } else if (chain.network_type !== EXPECTED_NETWORK_TYPE) {
      handle(new WrongNetworkError());
    }
  }, [activeProviderInfo, chain, chainError, isLoading, handle]);
}

async function getCW20Balance(chain: Chain, walletAddress: string) {
  const cw20BalancePromises = chain.tokens
    .filter((x) => x.type === "cw20")
    .map((x) =>
      queryContract(
        "cw20Balance",
        x.token_id,
        { addr: walletAddress },
        chain.lcd_url
      ).then((data) => ({
        denom: x.token_id,
        amount: data.balance,
      }))
    );

  const cw20Balances = await Promise.all(cw20BalancePromises);
  return cw20Balances;
}
