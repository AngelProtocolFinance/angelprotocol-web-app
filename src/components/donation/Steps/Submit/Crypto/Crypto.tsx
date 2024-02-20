import { WalletProvider } from "@terra-money/wallet-provider";
import { chainOptions } from "constants/chainOptions";
import { chains } from "constants/chains";
import WalletContext from "contexts/WalletContext/WalletContext";
import { humanize } from "helpers";
import { useUsdRateQuery } from "services/coingecko";
import { CryptoSubmitStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import Image from "../../../../Image";
import Summary from "../common/Summary";
import Checkout from "./Checkout";

export default function Crypto(props: CryptoSubmitStep) {
  const dispatch = useSetter();
  function goBack() {
    dispatch(setStep("splits"));
  }
  const { details } = props;

  const Amount = withUSD(details.token.coingecko_denom);

  return (
    <Summary
      onBack={goBack}
      Amount={Amount}
      amount={+details.token.amount}
      splitLiq={props.liquidSplitPct}
      preSplitContent={
        <>
          <dl className="text-gray-d1 py-3 flex items-center justify-between border-b border-prim">
            <dt className="mr-auto">Currency</dt>
            <Image
              className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
              src={details.token.logo}
            />
            <dd className="text-gray-d2">{details.token.symbol}</dd>
          </dl>

          <dl className="text-gray-d1 py-3 flex items-center justify-between">
            <dt className="mr-auto">Blockchain</dt>
            <dd className="text-gray-d2">
              {chains[details.chainId.value].name}
            </dd>
          </dl>
        </>
      }
    >
      <WalletProvider {...chainOptions}>
        <WalletContext>
          <Checkout {...props} classes="mt-4" />
        </WalletContext>
      </WalletProvider>
    </Summary>
  );
}

const withUSD = (coinGeckoId: string) =>
  function Amount(props: { amount: string | number; classes?: string }) {
    const { data: rate, isLoading, isError } = useUsdRateQuery(coinGeckoId);
    return (
      <dd className={props.classes}>
        {humanize(props.amount, 4)}{" "}
        {isLoading ? (
          "($--)"
        ) : isError || !rate ? (
          <span className="text-red">"($--)"</span>
        ) : (
          `($${humanize(+props.amount * rate, 2)})`
        )}
      </dd>
    );
  };
