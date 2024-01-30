import { Info, LoadingStatus } from "components/Status";
import { chains } from "constants/chains";
import { isDisconnected, useWalletContext } from "contexts/WalletContext";
import { useState } from "react";
import { CryptoSubmitStep } from "slices/donation";
import { TxPackage } from "types/tx";
import { ConnectedWallet, isCosmos, isEVM, isTerra } from "types/wallet";
import Breakdown from "./Breakdown";
import Container from "./Container";
import WalletSelection from "./WalletSelection";
import { EstimateStatus, isSuccess } from "./types";

export default function Crypto(props: CryptoSubmitStep) {
  const wallet = useWalletContext();
  const chainID = props.details.chainId.value;
  const [estimate, setEstimate] = useState<EstimateStatus>("loading");

  if (wallet === "loading") {
    return (
      <Container {...props}>
        <LoadingStatus classes="justify-self-center mt-6">
          Connecting wallet..
        </LoadingStatus>
      </Container>
    );
  }

  if (isDisconnected(wallet)) {
    return (
      <Container {...props}>
        <WalletSelection chainID={chainID} wallets={wallet} />
      </Container>
    );
  }

  if (!wallet.supportedChains.includes(chainID)) {
    return (
      <Container {...props} wallet={wallet}>
        <Info classes="justify-self-center mt-6">
          Connected wallet doesn't support this chain.
        </Info>
        <button
          className="btn-outline-filled px-4 py-2 mt-4 text-xs font-normal justify-self-center"
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
      <Container {...props} wallet={wallet}>
        {wallet.switchChain ? (
          <>
            <Info classes="justify-self-center mt-6">
              Your wallet is not connected to your selected chain.
            </Info>
            <button
              disabled={wallet.isSwitching}
              type="button"
              onClick={() => wallet.switchChain?.(chainID)}
              className="btn-outline-filled px-4 py-2 mt-4 text-xs font-normal justify-self-center"
            >
              Switch to {chains[chainID].name}
            </button>
          </>
        ) : (
          <Info classes="justify-self-center mt-6">
            Kindly set your wallet network to your selected chain.
          </Info>
        )}
      </Container>
    );
  }

  return (
    <Container
      {...props}
      txPackage={txPackage(estimate, wallet)}
      wallet={wallet}
    >
      <Breakdown
        submitStep={props}
        estimate={estimate}
        setEstimate={setEstimate}
        sender={wallet.address}
      />
    </Container>
  );
}

const txPackage = (
  estimate: EstimateStatus,
  wallet: ConnectedWallet
): TxPackage | undefined => {
  if (!isSuccess(estimate)) return undefined;

  const { items, ...rest } = estimate;
  const { address: sender } = wallet;

  switch (rest.chainID) {
    case "phoenix-1":
    case "pisco-1": {
      if (!isTerra(wallet)) throw new Error("User selected wrong wallet");
      const { toSend, chainID } = rest;
      return { toSend, chainID, sender, post: wallet.post };
    }
    case "juno-1":
    case "uni-6": {
      const { toSend, chainID } = rest;
      if (!isCosmos(wallet)) throw new Error("User selected wrong wallet");
      return {
        chainID,
        sender,
        sign: wallet.sign,
        toSend,
      };
    }
    default: {
      if (!isEVM(wallet)) throw new Error("User selected wrong wallet");
      const { toSend, chainID } = rest;
      return { toSend, chainID, sender, request: wallet.request };
    }
  }
};
