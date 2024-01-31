import { EMAIL_SUPPORT } from "constants/env";
import { appRoutes } from "constants/routes";
import { StockCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../BackBtn";

export default function Stocks(props: StockCheckoutStep) {
  const profileUrl = `${window.location.origin}${appRoutes.donate}/${props.recipient.id}`;
  const dispatch = useSetter();

  return (
    <div className="grid content-start p-4 @md:p-8">
      <BackBtn type="button" onClick={() => dispatch(setStep("donate-form"))} />
      <p className="mt-4 text-center text-gray-d1 uppercase">
        Donation pending
      </p>
      <p className="mt-4 text-center">
        To complete this donation, please email or provide your broker with the
        following information:
      </p>
      <div className="grid rounded bg-gray-l5 dark:bg-bluegray-d1 p-3 text-sm leading-relaxed mt-6">
        <p>
          Please transfer [&nbsp;{props.details.numShares}&nbsp;] share(s) of
          [&nbsp;{props.details.symbol}&nbsp;] to:
        </p>
        <p>Deliver to: Fidelity Investments</p>
        <p>DTC number: 0226</p>
        <p>Account number: Z40390069</p>
        <p>Account name: Altruistic Partners Empowering Society, Inc</p>
        <p>
          Reference: [Internal Ref#, if needed] {props.recipient.name} (
          {profileUrl})
        </p>
      </div>
      <p className="text-sm mt-3 mb-1">
        You may also need the following information:
      </p>
      <span className="rounded bg-gray-l5 dark:bg-bluegray-d1 p-3 text-sm leading-relaxed ">
        Better.Giving is a nonprofit with 501(c)(3) tax-exempt status, Federal
        ID #: 87-3758939.
      </span>

      <p className="mt-8 text-sm">
        For your gift to be recognized when it comes into our account, please
        email us details of the shares you are donating and which project or
        projects to designate your donation to. Please send this email to
        support@better.giving.
      </p>

      <p className="mt-6 text-sm text-right text-balance">
        You may also generate an email that automatically include needed
        information.
      </p>
      <a
        href={emailLink(
          props.recipient.name,
          profileUrl,
          props.details.numShares,
          props.details.symbol
        )}
        className="btn btn-orange px-4 py-2 justify-self-end mt-2 text-xs font-normal font-work"
      >
        Generate email
      </a>
    </div>
  );
}

const NEW_LINE = "%0D%0A";
const emailLink = (
  charityName: string,
  profileUrl: string,
  numberOfShares: number,
  stockSymbol: string
) => `
mailto:${"[ Your broker's email ]"}
  ?cc=${EMAIL_SUPPORT}
  &subject=Stock donation to Better.Giving supporting ${charityName}
  &body=
Hi,${NEW_LINE}
${NEW_LINE}
I would like to donate stock to support ${charityName} (${profileUrl}). 
I have CCed better.giving (EIN 87-3758939) to ensure this tax-deductible donation gets accounted for correctly, 
please ask them if you have any technical questions.${NEW_LINE}
${NEW_LINE}
Please transfer ${numberOfShares || "[NUMBER_OF_SHARES]"} shares of ${
  stockSymbol || "[STOCK_SYMBOL]"
} to:${NEW_LINE}
Deliver to: Fidelity Investments${NEW_LINE}
DTC number: 0226${NEW_LINE}
Account number: Z40390069${NEW_LINE}
Account name: Altruistic Partners Empowering Society, Inc${NEW_LINE}
Reference: [INTERNAL REF#, if needed] ${charityName} (${profileUrl})${NEW_LINE}
${NEW_LINE}
Thank you.`;
