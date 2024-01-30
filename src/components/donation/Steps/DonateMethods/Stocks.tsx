import { appRoutes } from "constants/routes";
import { FormStep } from "slices/donation";
import BuildEmailForm from "./BuildEmailForm";

type Props = { state: FormStep };

export default function Stocks({ state }: Props) {
  const charityName = state.recipient.name;
  const profileUrl = `${window.location.origin}${appRoutes.donate}/${state.recipient.id}`;

  return (
    <div className="grid gap-5">
      <div className="grid rounded bg-gray-l5 dark:bg-bluegray-d1 p-2">
        <p>Please transfer [X] shares of [ABC] to:</p>
        <p>Deliver to: Fidelity Investments</p>
        <p>DTC number: 0226</p>
        <p>Account number: Z40390069</p>
        <p>Account name: Altruistic Partners Empowering Society, Inc</p>
        <p>
          Reference: [Internal Ref#, if needed] {charityName} ({profileUrl})
        </p>
      </div>
      <p> You may also need the following information:</p>
      <span className="rounded bg-gray-l5 dark:bg-bluegray-d1 p-2">
        Better.Giving is a nonprofit with 501(c)(3) tax-exempt status, Federal
        ID #: 87-3758939.
      </span>
      {/* build email form */}
      <BuildEmailForm charityName={charityName} profileUrl={profileUrl} />
      {/* CC us info */}
      <h4 className="text-lg sm:text-xl leading-relaxed">
        Step 2: Let Us Know
      </h4>
      <div className="grid gap-2">
        <p>
          For your gift to be recognized when it comes into our account, please
          email us details of the shares you are donating and which project or
          projects to designate your donation to. Please send this email to
          support@better.giving.
        </p>
        <i>
          If you generated an email with the above form, then we should have
          been "CC'd" automatically on the email to your broker.
        </i>
      </div>
      {/* additional info */}
      <h4 className="text-lg sm:text-xl leading-relaxed">
        Benefits of Donating Appreciated stock
      </h4>
      <p>
        You can enjoy significant tax advantages and maximize the size of your
        contributions when you transfer securities through Better.Giving:
      </p>
      <div className="grid rounded bg-gray-l5 dark:bg-bluegray-d1 p-2">
        <span className="text-sm text-gray">
          NOTE: This is not financial advice! Please speak to your tax advisor
          or broker about your specific situation and country's tax laws.
        </span>
      </div>
      <p>
        If you held the stock for at least one year, you receive a tax deduction
        for the full value of the stock at the time of donation (not just the
        amount you paid for the stock).
      </p>
      <p>
        You avoid paying both capital gains tax and stock sales commissions.
        When you give appreciated stocks directly to a nonprofit, your gift can
        be up to 20% larger because you avoid the taxes you'd incur from selling
        and donating the cash.
      </p>
    </div>
  );
}
