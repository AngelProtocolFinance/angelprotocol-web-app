import { useEffect } from "react";
import { Connection, ProviderId, WalletData } from "./types";
import { GENERIC_ERROR_MESSAGE } from "pages/Registration/constants";
import { UnexpectedStateError } from "errors/errors";
import { useErrorContext } from "../ErrorContext";
import { getConnectedProviderId } from "./helpers/connectedProvider";

export default function useAutoConnect(wallets: WalletData[]) {
  const { handleError } = useErrorContext();

  const connectedWallet = wallets.find(({ providerInfo }) => !!providerInfo);
  const areWalletsLoading = wallets.some(({ isLoading }) => isLoading);

  useEffect(() => {
    (async function () {
      try {
        const connectedProviderId = getConnectedProviderId();

        /**
         * This hook should be triggered only on first load, but only after all wallets are done loading.
         * So we need to check:
         * - areWalletsLoading -> are the wallets still loading
         * - connectedWallet -> is there a wallet that's currently connected
         * - !connectedProviderId -> was the user connected to a wallet in their last session on the site
         * If the wallets are still loading or there is no currently connected wallet or the user was not connected
         * in their last session on the site, then there is no need to run "auto-connect" yet.
         * Otherwise, we should auto-connect the user's wallet to the site
         */
        if (areWalletsLoading || connectedWallet || !connectedProviderId) {
          return;
        }

        const lastConnection = findLastConnection(wallets, connectedProviderId);

        if (!lastConnection) {
          throw new UnexpectedStateError(
            `Stored an unexpected provider ID ${connectedProviderId}`
          );
        }

        if (!lastConnection.connect) {
          throw new UnexpectedStateError(
            `Provider connection doesn't have a connect() function. ${JSON.stringify(
              lastConnection
            )}`
          );
        }

        await lastConnection.connect();
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areWalletsLoading, connectedWallet]);
}

function findLastConnection(
  wallets: WalletData[],
  connectedProviderId: ProviderId
): Connection | undefined {
  for (const { connections } of wallets) {
    for (const conn of connections) {
      if (conn.providerId) {
        if (conn.providerId === connectedProviderId) {
          return conn;
        }
      } else if (conn.networks) {
        const result = conn.networks.find(
          (conn) => conn.providerId === connectedProviderId
        );

        if (result) {
          return result;
        }
      }
    }
  }
}
