import { useState } from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  const { buttonProps, isOpen } = useDropdownMenu(5);
  const [textToCopy, setTextToCopy] = useState("");

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
            <div className="flex justify-between items-center ml-5">
              <p>{wallets[0].terraAddress.substr(0, 15) + "..."}</p>
              <CopyToClipboard text={textToCopy} />
              <div className="flex justify-between items-center">
                <button {...buttonProps}>
                  <img src="assets/images/more.png" alt="AngelProtocol" />
                </button>
                <div
                  className={
                    isOpen
                      ? "block p-5 absolute top-16 right-5 bg-white text-black rounded-md"
                      : "hidden p-5 absolute top-16 right-5 bg-white text-black rounded-md"
                  }
                  role="menu"
                >
                  <a onClick={() => disconnect()}>Disconnect</a>
                </div>
              </div>
            </div>
          )}
        </div>
      );
  }
}
