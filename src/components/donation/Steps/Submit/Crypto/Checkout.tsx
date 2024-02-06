import Image from "components/Image/Image";
import { Info, LoadingStatus } from "components/Status";
import { chains } from "constants/chains";
import { isDisconnected, useWalletContext } from "contexts/WalletContext";
import { maskAddress } from "helpers";
import { PropsWithChildren } from "react";
import { ChainID } from "types/chain";
import { TokenWithAmount } from "types/tx";
import TxSubmit from "./TxSubmit";
import WalletSelection from "./WalletSelection";
import { SimulInput } from "./types";

type Props = {
  chainID: ChainID;
  token: TokenWithAmount;
  classes?: string;
};

export default function Checkout({ classes = "", ...props }: Props) {
  const wallet = useWalletContext();
  const chainID = props.chainID;

  if (wallet === "loading") {
    return (
      <Container classes={classes}>
        <LoadingStatus classes="py-2 mb-6 text-sm text-gray-d1">
          Connecting wallet..
        </LoadingStatus>
      </Container>
    );
  }

  if (isDisconnected(wallet)) {
    return (
      <Container classes={classes}>
        <WalletSelection chainID={chainID} wallets={wallet} classes="mt-2" />
      </Container>
    );
  }

  if (!wallet.supportedChains.includes(chainID)) {
    return (
      <Container classes={classes}>
        <Info classes="mt-2">Connected wallet doesn't support this chain.</Info>
        <button
          className="btn-outline-filled px-4 py-2 mt-2 text-xs font-normal font-work justify-self-center"
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
      <Container classes={classes}>
        {wallet.switchChain ? (
          <>
            <Info classes="mt-2">
              Your wallet is not connected to your selected chain.
            </Info>
            <button
              disabled={wallet.isSwitching}
              type="button"
              onClick={() => wallet.switchChain?.(chainID)}
              className="btn-outline-filled px-4 py-2 mt-2 text-xs font-normal font-work"
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
    <Container
      simulInput={{
        sender: wallet.address,
        token: props.token,
        chainID: props.chainID,
      }}
      classes={classes}
    >
      <div className="flex items-center gap-2 mt-2">
        <div className="size-2 rounded-full bg-green drop-shadow-[0_0_3px_rgba(126,198,130,0.9)]" />
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
    </Container>
  );
}

type ContainerProps = PropsWithChildren<{
  classes?: string;
  simulInput?: SimulInput;
}>;
function Container({ classes = "", simulInput, children }: ContainerProps) {
  return (
    <div className={classes}>
      <p>Select a wallet to continue:</p>
      {children}
      <TxSubmit simulInput={simulInput} classes="mt-8" />
    </div>
  );
}
