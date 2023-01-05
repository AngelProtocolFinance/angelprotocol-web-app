import { useCallback, useEffect } from "react";
import { useModalContext } from "contexts/ModalContext";
import { isDisconnected, useWalletContext } from "contexts/WalletContext";
import Breadcrumbs from "components/Breadcrumbs";
import KYC from "components/KYC";
import KadoModal from "components/KadoModal";
import { Tooltip } from "components/donation";
import { useGetter, useSetter } from "store/accessors";
import {
  DonationRecipient,
  DonationState,
  resetDetails,
  setRecipient,
} from "slices/donation";
import { appRoutes } from "constants/routes";
import Donater from "./Donater";
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
    <div className="justify-self-center grid padded-container max-w-[35rem] py-8 sm:py-20">
      <Breadcrumbs
        className="font-body font-normal text-sm justify-self-start sm:justify-self-auto mb-10 sm:mb-12"
        items={[
          { title: "Marketplace", to: appRoutes.marketplace },
          {
            title: props.name,
            to: `${appRoutes.profile}/${props.id}`,
          },
          {
            title: "Donate",
            to: `${appRoutes.donate}/${props.id}`,
          },
        ]}
      />
      {isHeadingShown(state) && (
        <>
          <h3 className="text-center text-3xl font-bold leading-snug mb-4">
            You're about to make a donation to {props.name}
          </h3>
          <span className="text-center font-normal text-sm">
            Don't have crypto in your wallet?{" "}
            <button
              className="font-bold underline hover:text-orange transition ease-in-out duration-300"
              onClick={handleOpenKado}
            >
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
  const wallet = useWalletContext();

  /** reset form state when user disconnects, user might change wallet */
  useEffect(() => {
    isDisconnected(wallet) && dispatch(resetDetails());
  }, [wallet, dispatch]);

  if (props.step <= 3) {
    if (wallet === "loading") {
      return <Tooltip type="Loading" message="Loading wallet" />;
    }

    if (isDisconnected(wallet)) {
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
