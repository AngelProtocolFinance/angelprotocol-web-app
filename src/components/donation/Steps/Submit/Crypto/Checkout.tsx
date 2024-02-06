import { Info, LoadingStatus } from "components/Status";
import { chains } from "constants/chains";
import { isDisconnected, useWalletContext } from "contexts/WalletContext";
import { CryptoSubmitStep } from "slices/donation";
import WalletSelection from "./WalletSelection";

export default function Checkout(props: CryptoSubmitStep) {
  const wallet = useWalletContext();
  const chainID = props.details.chainId.value;

  if (wallet === "loading") {
    return (
      <div>
        <LoadingStatus classes="justify-self-center mt-6">
          Connecting wallet..
        </LoadingStatus>
      </div>
    );
  }

  if (isDisconnected(wallet)) {
    return (
      <div>
        <WalletSelection chainID={chainID} wallets={wallet} />
      </div>
    );
  }

  if (!wallet.supportedChains.includes(chainID)) {
    return (
      <div>
        <Info classes="justify-self-center mt-6">
          Connected wallet doesn't support this chain.
        </Info>
        <button
          className="btn-outline-filled px-4 py-2 mt-4 text-xs font-normal font-work justify-self-center"
          type="button"
          onClick={wallet.disconnect}
        >
          change wallet
        </button>
      </div>
    );
  }

  if (chainID !== wallet.chainId) {
    return (
      <div>
        {wallet.switchChain ? (
          <>
            <Info classes="justify-self-center mt-6">
              Your wallet is not connected to your selected chain.
            </Info>
            <button
              disabled={wallet.isSwitching}
              type="button"
              onClick={() => wallet.switchChain?.(chainID)}
              className="btn-outline-filled px-4 py-2 mt-4 text-xs font-normal font-work justify-self-center"
            >
              Switch to {chains[chainID].name}
            </button>
          </>
        ) : (
          <Info classes="justify-self-center mt-6">
            Kindly set your wallet network to your selected chain.
          </Info>
        )}
      </div>
    );
  }

  return <div>connected wallet</div>;
}
