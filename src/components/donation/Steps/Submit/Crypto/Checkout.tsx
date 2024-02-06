import Image from "components/Image/Image";
import { Info, LoadingStatus } from "components/Status";
import { chains } from "constants/chains";
import { isDisconnected, useWalletContext } from "contexts/WalletContext";
import { maskAddress } from "helpers";
import { CryptoSubmitStep } from "slices/donation";
import { ConnectedWallet } from "types/wallet";
import WalletSelection from "./WalletSelection";

export default function Checkout({
  classes = "",
  ...props
}: CryptoSubmitStep & { classes?: string }) {
  const wallet = useWalletContext();
  const chainID = props.details.chainId.value;

  if (wallet === "loading") {
    return (
      <LoadingStatus classes={`justify-self-center ${classes}`}>
        Connecting wallet..
      </LoadingStatus>
    );
  }

  if (isDisconnected(wallet)) {
    return (
      <WalletSelection chainID={chainID} wallets={wallet} classes={classes} />
    );
  }

  if (!wallet.supportedChains.includes(chainID)) {
    return (
      <div className={classes}>
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
      <div className={classes}>
        {wallet.switchChain ? (
          <>
            <Info classes="justify-self-center">
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
          <Info classes="justify-self-center">
            Kindly set your wallet network to your selected chain.
          </Info>
        )}
      </div>
    );
  }

  return <CheckoutBtn wallet={wallet} />;
}

type Props = {
  wallet: ConnectedWallet;
};
function CheckoutBtn({ wallet }: Props) {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-1">
        <Image src={wallet.logo} className="size-5 rounded-full" />
        <span className="text-sm">{maskAddress(wallet.address)}</span>
        <button
          type="button"
          onClick={wallet.disconnect}
          className="bg-gray-l5 hover:bg-gray-l4 text-xs uppercase px-2 py-0.5"
        >
          change
        </button>
      </div>
      <button className="btn-orange w-full">Continue</button>
    </div>
  );
}
