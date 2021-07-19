import React from "react";

import {
  useWallet,
  WalletStatus,
  ConnectType,
} from "@terra-money/wallet-provider";

export function ConnectTerraButton() {
  const {
    status,
    availableConnectTypes,
    availableInstallTypes,
    connect,
    disconnect,
    install,
    wallets,
  } = useWallet();

  switch (status) {
    case WalletStatus.INITIALIZING:
      return (
        <div>
          <button disabled>Initializing Wallet...</button>
        </div>
      );
    case WalletStatus.WALLET_NOT_CONNECTED:
      return (
        <div>
          {availableConnectTypes.includes(ConnectType.CHROME_EXTENSION) && (
            <button onClick={() => connect(ConnectType.CHROME_EXTENSION)}>
              Connect Chrome Extension
            </button>
          )}
          {availableInstallTypes.includes(ConnectType.CHROME_EXTENSION) && (
            <button onClick={() => install(ConnectType.CHROME_EXTENSION)}>
              Install Chrome Extension
            </button>
          )}
        </div>
      );
    case WalletStatus.WALLET_CONNECTED:
      return (
        <div>
          {wallets.length > 0 && (
            <div>
              <p>terraAddress: {wallets[0].terraAddress}</p>
            </div>
          )}
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      );
  }
}
