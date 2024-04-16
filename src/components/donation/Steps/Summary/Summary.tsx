import { SummaryStep, setDonor, setStep } from "slices/donation";
import { useGetter, useSetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import { currency } from "../common/Currency";
import SummaryContainer from "../common/Summary";
import { token } from "../common/Token";
import DonorForm from "./DonorForm";

export default function Summary({
  details,
  liquidSplitPct,
  donor,
  tip,
  recipient,
  isPreview = false,
}: SummaryStep & { isPreview?: boolean }) {
  const dispatch = useSetter();
  const user = useGetter((state) => state.auth.user);

  const [amount, Amount, currencyCode] = (() => {
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
        return [
          +details.amount,
          currency(details.currency),
          details.currency.code,
        ];
    }
  })();

  return (
    <SummaryContainer
      frequency={details.method === "stripe" ? details.frequency : "once"}
      classes="grid content-start p-4 @md/steps:p-8"
      Amount={Amount}
      amount={amount}
      splitLiq={liquidSplitPct}
      onBack={() =>
        recipient.hide_bg_tip
          ? dispatch(setStep("splits"))
          : dispatch(setStep("tip"))
      }
      tip={
        tip
          ? {
              value: tip,
              charityName: recipient.name,
            }
          : undefined
      }
    >
      <DonorForm
        donor={
          donor ||
          (userIsSignedIn(user)
            ? {
                lastName: user.lastName ?? "",
                firstName: user.firstName ?? "",
                email: user.email,
              }
            : undefined)
        }
        onSubmit={(donor) => {
          if (isPreview) return;
          if (currencyCode) {
            document.cookie = `bg_pref_currency=${currencyCode.toUpperCase()}`;
          }
          dispatch(setDonor(donor));
        }}
        classes="mt-6"
      />
    </SummaryContainer>
  );
}
