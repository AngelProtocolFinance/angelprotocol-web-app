import { EMAIL_SUPPORT } from "constants/env";
import { href } from "react-router";
import { BackBtn } from "../common/back-btn";
import { use_donation_state } from "../context";
import {
  type StocksDonationDetails,
  back_to_form,
  is_fund,
  tip_val,
} from "../types";
import { DonationTerms } from "./donation-terms";

export function Stocks(props: StocksDonationDetails) {
  const { state } = use_donation_state();
  const id = state.init.recipient.id;
  const path = is_fund(id)
    ? href("/fundraisers/:fundId", { fundId: id })
    : href("/marketplace/:id", { id: id });

  const tipv = tip_val(props.tip_format, props.tip, +props.num_shares);

  const url = `${window.location.origin}${path}`;
  const { set_state } = use_donation_state();
  return (
    <div className="grid content-start p-4 @md/steps:p-8">
      <BackBtn
        type="button"
        onClick={() => back_to_form("stocks", props, set_state)}
      />
      <p className="mt-4 text-center text-gray uppercase">Donation pending</p>
      <p className="mt-4 text-center">
        To complete this donation, please email or provide your broker with the
        following information:
      </p>
      <div className="grid rounded-sm bg-gray-l4 dark:bg-gray-d3 p-3 text-sm leading-relaxed mt-6">
        <p>
          Please transfer [&nbsp;
          {props.num_shares + tipv}
          &nbsp;] share(s) of [&nbsp;{props.symbol}&nbsp;] to:
        </p>
        <p>Deliver to: Fidelity Investments</p>
        <p>DTC number: 0226</p>
        <p>Account number: Z40390069</p>
        <p>Account name: Altruistic Partners Empowering Society, Inc</p>
        <p>
          Reference: [Internal Ref#, if needed] {state.init.recipient.name} (
          {url})
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
        href={email_link(
          state.init.recipient.name,
          url,
          +props.num_shares,
          props.symbol
        )}
        className="btn btn btn-blue bg-(--accent-primary) enabled:hover:bg-(--accent-primary) rounded-full px-4 py-2 justify-self-end mt-2 text-xs font-normal"
      >
        Generate email
      </a>
      <DonationTerms
        endowName={state.init.recipient.name}
        classes="mt-5 border-t border-gray-l3 pt-4"
      />
    </div>
  );
}

const NEW_LINE = "%0D%0A";
const email_link = (
  charity_name: string,
  profile_url: string,
  number_of_shares: number,
  stock_symbol: string
) => `
mailto:${"[ Your broker's email ]"}
  ?cc=${EMAIL_SUPPORT}
  &subject=Stock donation to Better Giving supporting ${charity_name}
  &body=
Hi,${NEW_LINE}
${NEW_LINE}
I would like to donate stock to support ${charity_name} (${profile_url}). 
I have CCed Better Giving (EIN 87-3758939) to ensure this tax-deductible donation gets accounted for correctly, 
please ask them if you have any technical questions.${NEW_LINE}
${NEW_LINE}
Please transfer ${number_of_shares || "[NUMBER_OF_SHARES]"} shares of ${
  stock_symbol || "[STOCK_SYMBOL]"
} to:${NEW_LINE}
Deliver to: Fidelity Investments${NEW_LINE}
DTC number: 0226${NEW_LINE}
Account number: Z40390069${NEW_LINE}
Account name: Altruistic Partners Empowering Society, Inc${NEW_LINE}
Reference: [INTERNAL REF#, if needed] ${charity_name} (${profile_url})${NEW_LINE}
${NEW_LINE}
Thank you.`;
