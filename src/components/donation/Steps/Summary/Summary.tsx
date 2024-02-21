import { SummaryStep, setDonor, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import { currency } from "../common/Currrency";
import SummaryContainer from "../common/Summary";
import { token } from "../common/Token";
import DonorForm from "./DonorForm";

export default function Summary({
  details,
  liquidSplitPct,
  donor,
}: SummaryStep) {
  const dispatch = useSetter();

  const [amount, Amount] = (() => {
    switch (details.method) {
      case "crypto": {
        return [+details.token.amount, token(details.token.coingecko_denom)];
      }
      //stocks skips summary (straight to submit), as donor info is not saved in DB
      case "stocks": {
        const { numShares, symbol } = details;
        return [numShares, currency({ code: symbol, rate: null })];
      }
      default:
        return [+details.amount, currency(details.currency)];
    }
  })();

  return (
    <SummaryContainer
      classes="grid content-start p-4 @md:p-8"
      Amount={Amount}
      amount={amount}
      splitLiq={liquidSplitPct}
      onBack={() => dispatch(setStep("splits"))}
    >
      <DonorForm
        donor={donor}
        onSubmit={(donor) => dispatch(setDonor(donor))}
        classes="mt-4"
      />
    </SummaryContainer>
  );
}
