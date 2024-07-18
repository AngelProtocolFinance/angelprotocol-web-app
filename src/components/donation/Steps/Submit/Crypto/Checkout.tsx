import Image from "components/Image/Image";
import { Info, LoadingStatus } from "components/Status";
import { chains } from "constants/chains";
import { isDisconnected, useWalletContext } from "contexts/WalletContext";
import { maskAddress } from "helpers";
import { type PropsWithChildren, type ReactNode, useState } from "react";
import { chainIdIsNotSupported } from "types/chain";
import type { ConnectedWallet } from "types/wallet";
import ContinueBtn from "../../common/ContinueBtn";
import type { CryptoSubmitStep } from "../../types";
import DirectMode from "./DirectMode";
import TxSubmit from "./TxSubmit";
import WalletSelection from "./WalletSelection";

type Props = CryptoSubmitStep & { classes?: string };

export default function Checkout({ classes = "", ...props }: Props) {
  const wallet = useWalletContext();
  const chainID = props.details.chainId;

  type Method = "direct" | "with-wallet";
  //state to allow opting for direct donation
  const [method, setMethod] = useState<Method>(
    chainIdIsNotSupported(chainID) ? "direct" : "with-wallet"
  );

  if (wallet === "loading") {
    return (
      <Container classes={classes} donation={props}>
        <LoadingStatus classes="py-2 mb-6 text-sm text-navy-l1">
          Connecting wallet..
        </LoadingStatus>
      </Container>
    );
  }

  if (chainIdIsNotSupported(chainID)) {
    return <DirectMode classes="mt-6" donation={props} />;
  }

  if (isDisconnected(wallet)) {
    if (method === "direct") {
      return <DirectMode classes="mt-6" donation={props} />;
    }
    return (
      <Container
        classes={`${classes} grid`}
        donation={props}
        continueBtn={
          <ContinueBtn
            onClick={() => setMethod("direct")}
            className="justify-self-stretch"
            text="Donate directly to wallet address"
          />
        }
      >
        <WalletSelection
          wallets={wallet.filter((w) => w.supportedChains.includes(chainID))}
          classes="mt-2"
        />
        {method === "with-wallet" && (
          <div className="w-full h-px border border-gray-l4 my-9 flex items-center justify-center">
            <span className="bg-white px-3.5 text-navy-l3">OR</span>
          </div>
        )}
      </Container>
    );
  }

  if (!wallet.supportedChains.includes(chainID)) {
    return (
      <Container classes={classes} donation={props}>
        <Info classes="mt-2">Connected wallet doesn't support this chain.</Info>
        <button
          className="btn-outline-filled px-4 py-2 mt-2 text-xs font-normal justify-self-center"
          type="button"
          onClick={wallet.disconnect}
        >
          change wallet
        </button>
      </Container>
    );
  }

  if (chainID !== wallet.chainId) {
    return (
      <Container classes={classes} donation={props}>
        {wallet.switchChain ? (
          <>
            <Info classes="mt-2">
              Your wallet is not connected to your selected chain.
            </Info>
            <button
              disabled={wallet.isSwitching}
              type="button"
              onClick={() => wallet.switchChain?.(chainID)}
              className="btn-outline-filled px-4 py-2 mt-2 text-xs font-normal"
            >
              Switch to {chains[chainID].name}
            </button>
          </>
        ) : (
          <Info classes="mt-2">
            Kindly set your wallet network to your selected chain.
          </Info>
        )}
      </Container>
    );
  }

  return (
    <Container donation={props} wallet={wallet} classes={classes}>
      <div className="flex items-center gap-2 mt-2">
        <div className="size-2 rounded-full bg-green drop-shadow-[0_0_3px_rgba(126,198,130,0.9)]" />
        <Image src={wallet.logo} className="size-5 rounded-full" />
        <span className="text-sm">{maskAddress(wallet.address)}</span>
        <button
          type="button"
          onClick={wallet.disconnect}
          className="bg-gray-l5 hover:bg-gray-l4 text-xs px-3 py-1 rounded-full"
        >
          Change
        </button>
      </div>
    </Container>
  );
}

type ContainerProps = PropsWithChildren<{
  classes?: string;
  wallet?: ConnectedWallet;
  donation: CryptoSubmitStep;
  continueBtn?: ReactNode;
}>;
function Container({
  classes = "",
  wallet,
  children,
  donation,
  continueBtn = <TxSubmit wallet={wallet} donation={donation} classes="mt-8" />,
}: ContainerProps) {
  return (
    <div className={classes}>
      <p>Select a wallet to continue:</p>
      {children}
      {continueBtn}
    </div>
  );
}
