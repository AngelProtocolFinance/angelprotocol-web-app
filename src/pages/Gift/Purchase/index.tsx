import { useEffect } from "react";
import { useGetWallet } from "contexts/WalletContext";
import { Tooltip } from "components/donation";
import { useGetter, useSetter } from "store/accessors";
import { DonationState, resetDetails } from "slices/gift";
import { chainIds } from "constants/chainIds";
import { IS_TEST } from "constants/env";
import Progress from "./Progress";
import Purchaser from "./Purchaser";
import Result from "./Result";
import Submit from "./Submit";

export default function Purchase() {
  const state = useGetter((state) => state.gift);

  return (
    <div className="justify-self-center grid padded-container max-w-[35rem]">
      {isHeadingShown(state) && (
        <>
          <h3 className="text-center text-3xl font-bold mt-20 leading-snug">
            Purchase Angel Protocol Giftcard
          </h3>
          <Progress classes="my-12" />
        </>
      )}

      <CurrStep {...state} />
    </div>
  );
}

function CurrStep(props: DonationState) {
  const dispatch = useSetter();
  const { wallet, isLoading } = useGetWallet();

  /** reset form state when user disconnects, user might change wallet */
  useEffect(() => {
    !wallet && dispatch(resetDetails());
  }, [wallet, dispatch]);

  if (props.step === 2 || props.step === 1) {
    if (isLoading) {
      return <Tooltip type="Loading" message="Loading wallet" />;
    }

    if (!wallet) {
      return (
        <Tooltip
          type="Info"
          message="You need to connect your wallet to make a donation"
        />
      );
    }

    if (wallet.chain.chain_id !== chainIds.juno) {
      return (
        <Tooltip
          type="Info"
          message={`Kindly switch to Juno ${IS_TEST ? "Testnet" : "Mainnet"}`}
        />
      );
    }

    if (props.step === 2) {
      return <Submit {...props} wallet={wallet} />;
    }

    return <Purchaser {...props} wallet={wallet} />;
  } else {
    return <Result {...props} classes="justify-self-center mt-16" />;
  }
}

function isHeadingShown(state: DonationState) {
  switch (state.step) {
    case 3:
      if (state.status === "error") return false;
      if ("hash" in state.status) return false;
      //only show progress on loading
      return true;
    default:
      return true;
  }
}
