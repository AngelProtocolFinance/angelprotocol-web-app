import { useState } from "react";
import { EstimateStatus, isSuccess } from "./types";
import { TxPackage } from "types/tx";
import { ConnectedWallet, isCosmos, isEVM, isTerra } from "types/wallet";
import { isDisconnected, useWalletContext } from "contexts/WalletContext";
import { Info, LoadingStatus } from "components/Status";
import { SubmitStep } from "slices/donation";
import Breakdown from "./Breakdown";
import Container from "./Container";
import WalletSelection from "./WalletSelection";

export default function Submit(props: SubmitStep) {
  const wallet = useWalletContext();
  const chainID = props.details.chainId.value;
  const [estimate, setEstimate] = useState<EstimateStatus>("loading");

  if (wallet === "loading") {
    return (
      <Container {...props}>
        <LoadingStatus classes="justify-self-center">
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
      <Container {...props}>
        <Info classes="justify-self-center">
          Connected wallet doesn't support this chain
        </Info>
      </Container>
    );
  }

  if (chainID !== wallet.chainId) {
    return (
      <Container {...props}>
        <Info classes="justify-self-center">
          Your wallet is not connected to your selected chain
        </Info>
      </Container>
    );
  }

  return (
    <Container {...props} txPackage={txPackage(estimate, wallet)}>
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
