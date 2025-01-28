import { EMAIL_SUPPORT } from "constants/env";
import { appRoutes } from "constants/routes";
import BackBtn from "../common/back-btn";
import { useDonationState } from "../context";
import type { StockCheckoutStep } from "../types";
import { DonationTerms } from "./donation-terms";

export default function Stocks(props: StockCheckoutStep) {
  const profileUrl = `${window.location.origin}${appRoutes.donate}/${props.init.recipient.id}`;
  const { setState } = useDonationState();
  return (
    <div className="grid content-start p-4 @md/steps:p-8">
      <BackBtn
        type="button"
        onClick={() => setState({ ...props, step: "donate-form" })}
      />
      <p className="mt-4 text-center text-gray uppercase">Donation pending</p>
      <p className="mt-4 text-center">
        To complete this donation, please email or provide your broker with the
        following information:
      </p>
      <div className="grid rounded-sm bg-gray-l4 dark:bg-gray-d3 p-3 text-sm leading-relaxed mt-6">
        <p>
          Please transfer [&nbsp;
          {props.details.numShares + (props.tip?.value ?? 0)}
          &nbsp;] share(s) of [&nbsp;{props.details.symbol}&nbsp;] to:
        </p>
        <p>Deliver to: Fidelity Investments</p>
        <p>DTC number: 0226</p>
        <p>Account number: Z40390069</p>
        <p>Account name: Altruistic Partners Empowering Society, Inc</p>
        <p>
          Reference: [Internal Ref#, if needed] {props.init.recipient.name} (
          {profileUrl})
        </p>
      </div>
      <p className="text-sm mt-3 mb-1">
        You may also need the following information:
      </p>
      <span className="rounded-sm bg-gray-l4 dark:bg-gray-d3 p-3 text-sm leading-relaxed ">
        Better Giving is a nonprofit with 501(c)(3) tax-exempt status, Federal
        ID #: 87-3758939.
      </span>

      <p className="mt-8 text-sm">
        For your gift to be recognized when it comes into our account, please
        email us details of the shares you are donating and which project or
        projects to designate your donation to. Please send this email to
        support@better.giving.
      </p>

      <p className="mt-6 text-sm text-right text-balance">
        You may also generate an email that automatically includes the needed
        information.
      </p>
      <a
        href={emailLink(
          props.init.recipient.name,
          profileUrl,
          +props.details.numShares,
          props.details.symbol
        )}
        className="btn btn-blue bg-(--accent-primary) enabled:hover:bg-(--accent-primary) rounded-full px-4 py-2 justify-self-end mt-2 text-xs font-normal"
      >
        Generate email
      </a>
      <DonationTerms
        endowName={props.init.recipient.name}
        classes="mt-5 border-t border-gray-l4 pt-4"
      />
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
  &subject=Stock donation to Better Giving supporting ${charityName}
  &body=
Hi,${NEW_LINE}
${NEW_LINE}
I would like to donate stock to support ${charityName} (${profileUrl}). 
I have CCed Better Giving (EIN 87-3758939) to ensure this tax-deductible donation gets accounted for correctly, 
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
