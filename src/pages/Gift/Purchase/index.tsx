import { useEffect } from "react";
import { useGetWallet } from "contexts/WalletContext";
import { placeholderChain } from "contexts/WalletContext/constants";
import { Tooltip } from "components/gift";
import { useGetter, useSetter } from "store/accessors";
import { DonationState, resetDetails } from "slices/gift";
import { chainIds } from "constants/chainIds";
import { IS_TEST } from "constants/env";
import Progress from "./Progress";
import Purchaser from "./Purchaser";
import Result from "./Result";
import Submit from "./Submit";
import { loadingKey } from "./constants";

export default function Purchase({ classes = "" }) {
  // const state = useGetter((state) => state.gift);

  const state: DonationState = {
    step: 3,
    status: { secret: "ap-UNI-5-12312379171231231237123" },
    details: {
      chainId: "uni-5",
      recipient: "juno123abc8910xyz",
      token: { ...placeholderChain.native_currency, amount: "1" },
      tokens: placeholderChain.tokens.map((t) => ({ ...t, amount: "0" })),
    },
  };

  return (
    <div
      className={`justify-self-center grid padded-container w-full max-w-[32rem] ${classes}`}
    >
      {isHeadingShown(state) && (
        <>
          <h3 className="text-center text-3xl font-bold leading-snug">
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
    return <Result {...props} />;
  }
}

function isHeadingShown(state: DonationState) {
  switch (state.step) {
    case 3:
      /** on tx step, only show if loading */
      return loadingKey in state.status;
    default:
      return true;
  }
}
