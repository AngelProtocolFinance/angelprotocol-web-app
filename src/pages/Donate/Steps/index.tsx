import { useEffect } from "react";
import { useGetWallet } from "contexts/WalletContext";
import KYC from "components/KYC";
import { Tooltip } from "components/donation";
import { useGetter, useSetter } from "store/accessors";
import {
  DonationRecipient,
  DonationState,
  TxStep,
  resetDetails,
  setRecipient,
} from "slices/donation";
import Donater from "./Donater";
import Progress from "./Progress";
import Result from "./Result";
import Success from "./Result/Success";
import Submit from "./Submit";

export default function Steps(props: DonationRecipient) {
  const state = useGetter((state) => state.donation);

  const dispatch = useSetter();
  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  return (
    <div className="justify-self-center grid padded-container max-w-[35rem]">
      {isHeadingShown(state) && (
        <>
          <h3 className="text-center text-3xl font-bold mt-20 leading-snug">
            You'are about to make a donation to {props.name}
          </h3>
          <Progress classes="my-12" />
        </>
      )}
      <Success {...placeholder} hash="abc123" />
      {/* <CurrStep {...state} /> */}
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
          message="You need to connect your wallet do make a donation"
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
            classes="grid gap-5 min-[510px]:grid-cols-2"
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

const placeholder: TxStep = {
  step: 4,
  recipient: {
    name: "mothers2mothers",
    id: 4,
    isKYCRequired: false,
  },
  details: {
    token: {
      amount: ".0001",
      approved: true,
      symbol: "ETH",
      decimals: 18,
      min_donation_amnt: 0.001,
      token_id: "ETH",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022",
      name: "Ether",
      type: "evm-native",
      balance: 0.029982210909615743,
    },
    pctLiquidSplit: "0",
    tokens: [
      {
        approved: true,
        symbol: "ETH",
        decimals: 18,
        min_donation_amnt: 0.001,
        token_id: "ETH",
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022",
        name: "Ether",
        type: "evm-native",
        balance: 0.029982210909615743,
        amount: "0",
      },
      {
        approved: true,
        symbol: "DAI",
        decimals: 18,
        min_donation_amnt: 0.01,
        token_id: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60",
        logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=022",
        name: "Dai Stablecoin",
        type: "erc20",
        balance: 0.989,
        amount: "0",
      },
    ],
    chainName: "Goerli Test Network",
    chainId: "5",
  },
  kyc: "skipped",
  status: {
    hash: "0x0a16a12609d93f5b14b6cfb6b23ca3b74854c66be5cef7e58f2118f1bd8b6f52",
  },
};
