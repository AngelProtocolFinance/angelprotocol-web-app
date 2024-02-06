import { Info, LoadingStatus } from "components/Status";
import { chains } from "constants/chains";
import { isDisconnected, useWalletContext } from "contexts/WalletContext";
import { CryptoSubmitStep } from "slices/donation";
import Breakdown from "./Breakdown";
import Container from "./Crypto";
import WalletSelection from "./WalletSelection";

export default function Crypto(props: CryptoSubmitStep) {
  const wallet = useWalletContext();
  const chainID = props.details.chainId.value;

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
          className="btn-outline-filled px-4 py-2 mt-4 text-xs font-normal font-work justify-self-center"
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
      </Container>
    );
  }

  return (
    <Container {...props} wallet={wallet}>
      <Breakdown {...props} />
    </Container>
  );
}
