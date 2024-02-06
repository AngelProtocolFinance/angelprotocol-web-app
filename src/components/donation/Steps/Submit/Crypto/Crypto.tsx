import { WalletProvider } from "@terra-money/wallet-provider";
import Icon from "components/Icon";
import { chainOptions } from "constants/chainOptions";
import { chains } from "constants/chains";
import { donationFees } from "constants/common";
import WalletContext from "contexts/WalletContext/WalletContext";
import { humanize } from "helpers";
import { CryptoSubmitStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import { TokenWithAmount } from "types/tx";
import Image from "../../../../Image";
import BackBtn from "../../BackBtn";
import Checkout from "./Checkout";
import { Row } from "./Row";

export default function Crypto(props: CryptoSubmitStep) {
  const dispatch = useSetter();
  function goBack() {
    dispatch(setStep("splits"));
  }
  const { details, recipient } = props;

  const tokenAmount = +details.token.amount;
  const liq = tokenAmount * (props.liquidSplitPct / 100);
  const locked = tokenAmount - liq;

  const feeRate =
    donationFees.base +
    donationFees.crypto +
    (recipient.isFiscalSponsored ? 0 : donationFees.fsa);

  const platFormFee = (feeRate / 100) * tokenAmount;

  return (
    <div className="grid content-start p-4 @md:p-8">
      <BackBtn type="button" onClick={goBack} className="mb-4" />

      <h4 className="flex items-center text-lg gap-2 mb-2">
        <Icon type="StickyNote" />
        <span className="font-semibold">Your donation summary</span>
      </h4>

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
        <dd className="text-gray-d2">{chains[details.chainId.value].name}</dd>
      </dl>

      <dl className="text-gray-d1 py-3 gap-y-2 grid grid-cols-[1fr_auto] justify-between border-y border-prim">
        <dt className="mr-auto">Donation for {recipient.name}</dt>
        <dd>{humanize(tokenAmount, 3)}</dd>
        <div className="flex items-center justify-between col-span-full">
          <dt className="mr-auto text-sm">Sustainable Fund</dt>
          <dd className="text-sm">{humanize(locked, 3)}</dd>
        </div>
        <div className="flex items-center justify-between col-span-full">
          <dt className="mr-auto text-sm">Instantly Available</dt>
          <dd className="text-sm">{humanize(liq, 3)}</dd>
        </div>
      </dl>
      <dl className="text-gray-d1 py-3 flex items-center justify-between">
        <dt className="mr-auto">
          Platform fee <span className="text-sm">({feeRate}%)</span>
        </dt>
        <dd>{humanize(platFormFee, 3)}</dd>
      </dl>

      <dl className="py-3 flex items-center justify-between font-semibold border-y border-prim">
        <dt className="mr-auto">Total donation</dt>
        <dd>{humanize(platFormFee, 3)}</dd>
      </dl>
      <WalletProvider {...chainOptions}>
        <WalletContext>
          {/* <Checkout {...props} classes="mt-4" /> */}
        </WalletContext>
      </WalletProvider>
    </div>
  );
}
