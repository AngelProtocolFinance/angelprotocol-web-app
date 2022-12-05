import { useCallback, useEffect } from "react";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import KYC from "components/KYC";
import { Tooltip } from "components/donation";
import { useGetter, useSetter } from "store/accessors";
import {
  DonationRecipient,
  DonationState,
  resetDetails,
  setRecipient,
} from "slices/donation";
import Donater from "./Donater";
import KadoModal from "./KadoModal";
import Progress from "./Progress";
import Result from "./Result";
import Submit from "./Submit";

export default function Steps(props: DonationRecipient) {
  const { showModal } = useModalContext();
  const state = useGetter((state) => state.donation);

  const dispatch = useSetter();
  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  const handleOpenKado = useCallback(
    () => showModal(KadoModal, {}),
    [showModal]
  );

  return (
    <div className="justify-self-center grid padded-container max-w-[35rem]">
      {isHeadingShown(state) && (
        <>
          <h3 className="text-center text-3xl font-bold mt-20 leading-snug">
            You're about to make a donation to {props.name}
          </h3>
          <span className="text-center font-normal text-sm">
            Don't have crypto in your wallet?{" "}
            <button className="font-bold underline" onClick={handleOpenKado}>
              Buy some to make your donation
            </button>
          </span>
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

  if (props.step <= 3) {
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
    switch (props.step) {
      case 3: {
        return <Submit {...props} wallet={wallet} />;
      }
      case 2: {
        return (
          <KYC
            type="on-donation"
            state={props}
            classes="grid gap-5 sm:grid-cols-2"
          />
        );
      }
      case 1: {
        return <Donater {...props} wallet={wallet} />;
      }
      default: {
        return <></>; // <Steps /> sets to step 1 onMount
      }
    }
  } else if (props.step === 4) {
    return <Result {...props} classes="justify-self-center mt-16" />;
  } else {
    return <></>;
  }
}

function isHeadingShown(state: DonationState) {
  switch (state.step) {
    case 4:
      if (state.status === "error") return false;
      if ("hash" in state.status) return false;
      //only show progress on loading
      return true;
    default:
      return true;
  }
}
