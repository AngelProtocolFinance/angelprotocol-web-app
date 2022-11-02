import { useCallback, useEffect } from "react";
import { ProviderInfo } from "./types";
import { useChainQuery } from "services/apes";
import { WalletDisconnectedError, WrongNetworkError } from "errors/errors";
import { EXPECTED_NETWORK_TYPE } from "constants/env";
import { useErrorContext } from "../ErrorContext";
import { placeholderChain } from "./constants";

export default function useVerifyChain(
  activeProviderInfo: ProviderInfo | undefined,
  disconnect: () => void
) {
  const {
    data: chain = placeholderChain,
    isLoading,
    error,
  } = useChainQuery(
    { providerInfo: activeProviderInfo! },
    { skip: !activeProviderInfo }
  );

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
    if (!activeProviderInfo) {
      return;
    }
    if (error) {
      handle(error);
    } else if (chain.network_type !== EXPECTED_NETWORK_TYPE) {
      handle(new WrongNetworkError());
    }
  }, [activeProviderInfo, chain, error, handle]);

  return {
    chain,
    isLoading,
  };
}
