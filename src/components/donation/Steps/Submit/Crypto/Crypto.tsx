import { WalletProvider } from "@terra-money/wallet-provider";
import QueryLoader from "components/QueryLoader";
import { chains } from "constants/chains";
import WalletContext from "contexts/WalletContext/WalletContext";
import { useChainOptionsQuery } from "services/terra";
import Image from "../../../../Image";
import { useDonationState } from "../../Context";
import Summary from "../../common/Summary";
import { token } from "../../common/Token";
import type { CryptoSubmitStep } from "../../types";
import { DonationTerms } from "../DonationTerms";
import Checkout from "./Checkout";

export default function Crypto(props: CryptoSubmitStep) {
  const { setState } = useDonationState();
  const { details, tip, feeAllowance } = props;
  const Amount = token(details.token.coingecko_denom);

  return (
    <Summary
      classes="grid content-start p-4 @md/steps:p-8"
      onBack={() => setState({ ...props, step: "summary" })}
      Amount={Amount}
      amount={+details.token.amount}
      feeAllowance={feeAllowance}
      splitLiq={props.liquidSplitPct}
      tip={
        tip
          ? {
              value: tip.value,
              charityName: props.init.recipient.name,
            }
          : undefined
      }
      preSplitContent={
        <>
          <dl className="text-navy-l1 py-3 flex items-center justify-between border-b border-gray-l4">
            <dt className="mr-auto">Currency</dt>
            <Image
              className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
              src={details.token.logo}
            />
            <dd className="text-navy-d4">{details.token.symbol}</dd>
          </dl>

          <dl className="text-navy-l1 py-3 flex items-center justify-between">
            <dt className="mr-auto">Blockchain</dt>
            <dd className="text-navy-d4">{chains[details.chainId].name}</dd>
          </dl>
        </>
      }
      program={props.details.program}
    >
      <TerraLoadedCheckout {...props} />
      <DonationTerms endowName={props.init.recipient.name} classes="mt-5" />
    </Summary>
  );
}

function TerraLoadedCheckout(props: CryptoSubmitStep) {
  // simply using `useChainOptions` from terra lib would call `getOptions` every mount */
  const query = useChainOptionsQuery();
  return (
    <QueryLoader
      queryState={query}
      messages={{ loading: "loading form...", error: "failed to load form" }}
    >
      {(chainOptions) => (
        <WalletProvider {...chainOptions}>
          <WalletContext>
            <Checkout {...props} classes="mt-4" />
          </WalletContext>
        </WalletProvider>
      )}
    </QueryLoader>
  );
}
