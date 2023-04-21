import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetWallet } from "contexts/WalletContext";
import KYC from "components/KYC";
import Status, { LoadingStatus } from "components/Status";
import FiatSubmit from "components/donationFiat/Steps/FiatSubmit";
import { useGetter, useSetter } from "store/accessors";
import { resetDetails } from "slices/donation";
import { PAYMENT_WORDS } from "constants/env";
import { appRoutes } from "constants/routes";
import { ConfigParams } from "..";
import Donater from "./Donater";
import Result from "./Result";
import Submit from "./Submit";

export default function CurrentStep(props: ConfigParams) {
  const state = useGetter((state) => state.donation);
  const dispatch = useSetter();
  const { wallet, isLoading } = useGetWallet();

  /** reset form state when user disconnects, user might change wallet */
  useEffect(() => {
    !wallet && dispatch(resetDetails());
  }, [wallet, dispatch]);

  if (state.step <= 3) {
    if (isLoading) {
      return (
        <LoadingStatus classes="justify-self-center">
          Loading wallet
        </LoadingStatus>
      );
    }

    if (!wallet) {
      return (
        <Status icon="Info" classes="justify-self-center">
          You need to connect your web3 wallet to make a crypto{" "}
          {PAYMENT_WORDS.noun.singular} OR you can{" "}
          <Link
            className="font-bold underline hover:text-orange transition ease-in-out duration-300"
            to={appRoutes.donate_fiat + `/${state.recipient?.id}`}
          >
            {PAYMENT_WORDS.verb} with fiat
          </Link>
          .
        </Status>
      );
    }

    switch (state.step) {
      case 3: {
        return state.details.token.type === "fiat" ? (
          <FiatSubmit {...state} />
        ) : (
          <Submit {...state} wallet={wallet} />
        );
      }
      case 2: {
        return (
          <KYC
            type="on-donation"
            state={state}
            classes="grid gap-5 sm:grid-cols-2"
          />
        );
      }
      case 1: {
        return <Donater {...state} config={props} wallet={wallet} />;
      }
      default: {
        return <></>; // <Steps /> sets to step 1 onMount
      }
    }
  } else if (state.step === 4) {
    return <Result {...state} classes="justify-self-center mt-16" />;
  } else {
    return <></>;
  }
}
