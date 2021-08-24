import copyIcon from "../../assets/images/copy.png";
import moreIcon from "../../assets/images/more.png";
import useCopyAddress from "./useCopyAddress";
import useTerraConnector from "./useTerraConnector";

export default function TerraConnector() {
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
            <button onClick={handleConnect}>Connect Chrome Extension</button>
          )}
          {isInstallable && (
            <button onClick={handleInstall}>Install Chrome Extension</button>
          )}
        </div>
      );
    case WalletStatus.WALLET_CONNECTED:
      return (
        <div>
          {wallets.length > 0 && (
            <div className="flex justify-between items-center ml-5">
              <p>{wallets[0].terraAddress.substr(0, 15) + "..."}</p>
              <span
                className="mx-2"
                onClick={handleCopy(wallets[0].terraAddress)}
              >
                <img src={copyIcon} alt="AngelProtocol" />
              </span>
              <div className="flex justify-between items-center relative">
                <button {...buttonProps}>
                  <img src={moreIcon} alt="AngelProtocol" />
                </button>
                <div
                  className={
                    isOpen
                      ? "block p-5 absolute right-0 top-10 bg-white text-black rounded-md"
                      : "hidden p-5 absolute right-0 top-10 bg-white text-black rounded-md"
                  }
                  role="menu"
                >
                  <button onClick={handleDisconnect}>Disconnect</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
  }
}
