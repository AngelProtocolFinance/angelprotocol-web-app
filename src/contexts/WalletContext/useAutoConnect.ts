import { useEffect } from "react";
import { Connection, ProviderId, WalletData } from "./types";
import { GENERIC_ERROR_MESSAGE } from "pages/Registration/constants";
import { UnexpectedStateError } from "errors/errors";
import { useErrorContext } from "../ErrorContext";
import { getConnectedProviderId } from "./helpers/connectedProvider";

export default function useAutoConnect(wallets: WalletData[]) {
  const { handleError } = useErrorContext();

  const activeProviderInfo = wallets.find(
    ({ providerInfo, isLoading }) => !isLoading && providerInfo !== undefined
  )?.providerInfo;

  const providersLoading = wallets.some(({ isLoading }) => isLoading);

  useEffect(() => {
    (async function () {
      try {
        const connectedProviderId = getConnectedProviderId();

        if (providersLoading || activeProviderInfo || !connectedProviderId) {
          return;
        }

        const connectedProvider = findActiveConnection(
          wallets,
          connectedProviderId
        );

        if (!connectedProvider) {
          throw new UnexpectedStateError(
            `Stored an unexpected provider ID ${connectedProviderId}`
          );
        }

        if (!connectedProvider.connect) {
          throw new UnexpectedStateError(
            `Provider connection doesn't have a connect() function. ${JSON.stringify(
              connectedProvider
            )}`
          );
        }

        await connectedProvider.connect();
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providersLoading, activeProviderInfo]);
}

function findActiveConnection(
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
