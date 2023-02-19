import { EXPECTED_NETWORK_TYPE } from "@ap/constants";
import { useErrorContext } from "@ap/contexts";
import { WalletDisconnectedError, WrongNetworkError } from "@ap/errors";
import { useCallback, useEffect } from "react";
import { Chain } from "@ap/types/aws";

export function useVerifyChain(
  chain: Chain | undefined,
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
    if (!chain) {
      return;
    }
    if (chainError) {
      handle(chainError);
    } else if (chain.network_type !== EXPECTED_NETWORK_TYPE) {
      handle(new WrongNetworkError());
    }
  }, [chain, chainError, handle]);
}
