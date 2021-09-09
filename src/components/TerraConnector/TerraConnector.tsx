import { useState } from "react";
import copyIcon from "assets/images/copy.png";
import moreIcon from "assets/images/more.png";
import useCopyAddress from "./useCopyAddress";
import useTerraConnector from "./useTerraConnector";

export default function TerraConnector() {
  const [animation, setAnimation] = useState(false);
  const { buttonProps, isOpen, handleCopy } = useCopyAddress();
  const {
    status,
    wallets,
    WalletStatus,
    isInstallable,
    isConnectible,
    handleConnect,
    handleInstall,
    handleDisconnect,
  } = useTerraConnector();

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
          {isConnectible && (
            <button
              className="uppercase bg-orange rounded-xl w-40 h-8 d-flex justify-center items-center text-sm"
              onClick={handleConnect}
            >
              Connect Wallet
            </button>
          )}
          {isInstallable && (
            <button
              className="uppercase bg-leaf-green rounded-xl w-40 h-8 d-flex justify-center items-center text-sm"
              onClick={handleInstall}
            >
              Install Wallet
            </button>
          )}
        </div>
      );
    case WalletStatus.WALLET_CONNECTED:
      return (
        <div className="flex items-center">
          {wallets.length > 0 && (
            <div className="flex justify-between items-center ml-1">
              <p>{wallets[0].terraAddress.substr(0, 15) + "..."}</p>
              <span
                className="mx-2 cursor-pointer"
                onClick={handleCopy(wallets[0].terraAddress)}
              >
                <img
                  className={`${animation && "animate-customPing"}`}
                  onClick={() => setAnimation(true)}
                  onAnimationEnd={() => setAnimation(false)}
                  src={copyIcon}
                  title="Copy Wallet Address"
                />
              </span>
              <div className="flex justify-between items-center relative">
                <button {...buttonProps}>
                  <img src={moreIcon} alt="AngelProtocol" />
                </button>
                <div
                  className={
                    isOpen
                      ? "block px-5 py-3 absolute right-0 top-8 bg-white text-black rounded-md z-50"
                      : "hidden px-5 py-3 absolute right-0 top-8 bg-white text-black rounded-md z-50"
                  }
                  role="menu"
                >
                  <h3 className="text-base text-thin-blue mb-1 text-center">
                    {wallets[0].terraAddress.substr(0, 15) + "..."}
                  </h3>
                  <button
                    className="uppercase bg-thin-blue rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1"
                    onClick={handleCopy(wallets[0].terraAddress)}
                  >
                    Copy Address
                  </button>
                  <button className="uppercase bg-thin-blue rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1">
                    send
                  </button>
                  <button
                    className="uppercase bg-orange rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1"
                    onClick={handleDisconnect}
                  >
                    Disconnect Wallet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
  }
}
