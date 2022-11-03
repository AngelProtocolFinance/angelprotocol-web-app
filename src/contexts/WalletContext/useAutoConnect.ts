import { useEffect } from "react";
import { Connection, ProviderId, WalletData } from "./types";
import { GENERIC_ERROR_MESSAGE } from "pages/Registration/constants";
import { UnexpectedStateError } from "errors/errors";
import { useErrorContext } from "../ErrorContext";
import { getConnectedProviderId } from "./helpers/connectedProvider";

export default function useAutoConnect(wallets: WalletData[]) {
  const { handleError } = useErrorContext();

  useEffect(() => {
    (async function () {
      try {
        const connectedProviderId = getConnectedProviderId();

        if (!shouldAutoConnect(wallets, connectedProviderId)) {
          return;
        }

        const lastConnection = findLastConnection(wallets, connectedProviderId);

        if (verifyValid(lastConnection, connectedProviderId)) {
          await lastConnection.connect();
        }
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
      }
    })();
  }, [wallets, handleError]);
}

/**
 * This hook should be triggered only on first load, but only after all wallets are done loading.
 * So we need to check:
 * - activeWallet -> is there a loading wallet or an active (connected) wallet
 * - !connectedProviderId -> was the user connected to a wallet in their last session on the site
 * If the wallets are still loading or there is no currently connected wallet or the user was not connected
 * in their last session on the site, then there is no need to run "auto-connect" yet.
 * Otherwise, we should auto-connect the user's wallet to the site
 */
function shouldAutoConnect(
  wallets: WalletData[],
  connectedProviderId: ProviderId | undefined
): connectedProviderId is NonNullable<ProviderId> {
  const activeWallet = wallets.find(
    ({ providerInfo, isLoading }) => isLoading || !!providerInfo
  );

  return !activeWallet || !!connectedProviderId;
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

function verifyValid(
  connection: Connection | undefined,
  connectedProviderId: ProviderId
): connection is NonNullable<Required<Connection>> {
  if (!connection) {
    throw new UnexpectedStateError(
      `Stored an unexpected provider ID ${connectedProviderId}`
    );
  }

  if (!connection.connect) {
    throw new UnexpectedStateError(
      `Provider connection doesn't have a connect() function. ${JSON.stringify(
        connection
      )}`
    );
  }

  return true;
}
