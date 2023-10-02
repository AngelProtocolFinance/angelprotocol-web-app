import { useEffect } from "react";
import { DonaterConfigFromWidget } from "types/widget";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import KYC from "components/KYC";
import Status, { LoadingStatus } from "components/Status";
import { useGetter, useSetter } from "store/accessors";
import { fiatWallet, resetDetails } from "slices/donation";
import { IS_AST } from "constants/env";
import Donater from "./Donater";
import Result from "./Result";
import SplitModal from "./SplitModal";
import Submit from "./Submit";

type Props = { config: DonaterConfigFromWidget | null };

export default function CurrentStep({ config }: Props) {
  const { showModal } = useModalContext();
  const state = useGetter((state) => state.donation);
  const dispatch = useSetter();
  const { wallet = IS_AST ? fiatWallet : undefined, isLoading } =
    useGetWallet();

  /** reset form state when user disconnects, user might change wallet */
  useEffect(() => {
    !wallet && dispatch(resetDetails());
  }, [wallet, dispatch]);

  if (state.step === "tx") {
    return <Result {...state} classes="justify-self-center mt-16" />;
  }

  if (isLoading) {
    return (
      <LoadingStatus classes="justify-self-center">
        Loading wallet
      </LoadingStatus>
    );
  }

  if (!wallet) {
    if (state.recipient && state.recipient.endowType === "charity") {
      const { id, endowType } = state.recipient;
      return (
        <button
          type="button"
          className="btn-outline-filled font-work gap-2"
          onClick={() => {
            showModal(SplitModal, {
              endowId: id,
              endowType: endowType,
            });
          }}
        >
          <Icon type="CreditCard" className="text-xl" />
          <span className="text-sm">Donate with card</span>
        </button>
      );
    }

    return (
      <Status icon="Info" classes="justify-self-center">
        You need to connect your wallet to make a donation
      </Status>
    );
  }

  switch (state.step) {
    case "submit": {
      return <Submit {...state} wallet={wallet} />;
    }
    case "kyc-form": {
      return (
        <KYC
          type="on-donation"
          state={state}
          classes="grid gap-5 sm:grid-cols-2"
        />
      );
    }
    case "donate-form": {
      return <Donater {...state} config={config} wallet={wallet} />;
    }

    //init
    default: {
      return <></>; // <Steps /> sets to step 1 onMount
    }
  }
}
