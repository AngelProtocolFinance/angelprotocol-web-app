import { FormStep } from "slices/donation";
import { EMAIL_SUPPORT } from "constants/env";
import { appRoutes } from "constants/routes";

type Props = { state: FormStep };

export default function Stocks({ state }: Props) {
  const charityName = state.recipient.name;
  const profileUrl = `${window.location.origin}${appRoutes.donate}/${state.recipient.id}`;
  return (
    <>
      <h3 className="text-2xl sm:text-3xl text-center leading-relaxed">
        Stocks
      </h3>
      <p>
        To donate stock, please email or provide your broker with the following
        information:
      </p>
      <div className="grid rounded bg-gray-l5 p-2">
        <p>Please transfer X shares of ABC to:</p>
        <p>Deliver to: Fidelity Investments</p>
        <p>DTC number: 0226</p>
        <p>Account number: Z40390069</p>
        <p>Account name: Altruistic Partners Empowering Society, Inc</p>
        <p>
          Reference: [Internal Ref#, if needed] {charityName} ({profileUrl})
        </p>
      </div>
      <div className="grid">
        <p> You may also need the following information:</p>
        <span className="rounded bg-gray-l5 p-2">
          Better.Giving is a non-profit with 501(c)(3) tax-exempt status,
          Federal ID #: 87-3758939.
        </span>
      </div>
      <h4 className="text-lg sm:text-xl leading-relaxed">Let Us Know</h4>
      <div className="grid gap-2">
        <p>
          For your gift to be recognized when it comes into our account, please
          email us details of the shares you are donating and which project or
          projects to designate your donation to. Please send this email to
          support@better.giving.
        </p>
        <i>Note: You can also CC us the email you send to your broker.</i>
      </div>
      <button
        type="button"
        className="btn-orange btn-donate my-4 w-1/2 justify-self-center"
        onClick={() => openEmailClient(charityName, profileUrl)}
      >
        Send email
      </button>
      <h4 className="text-lg sm:text-xl leading-relaxed">
        Benefits of Donating Appreciated stock
      </h4>
      You can enjoy significant tax advantages and maximize the size of your
      contributions when you transfer securities through Better.Giving:
      <ul>
        <li>
          If you held the stock for at least one year, you receive a tax
          deduction for the full value of the stock at the time of donation (not
          just the amount you paid for the stock).
        </li>
        <li>
          You avoid paying both capital gains tax and stock sales commissions.
          When you give appreciated stocks directly to charity, your gift can be
          up to 20% larger because you avoid the taxes you'd incur from selling
          and donating the cash.
        </li>
      </ul>
    </>
  );
}

const NEW_LINE = "%0D%0A";

const openEmailClient = (charityName: string, profileUrl: string) => {
  window.open(`
  mailto:
    ?cc=${EMAIL_SUPPORT}
    &subject=Stock donation to Better.Giving supporting ${charityName}
    &body=
Hi,${NEW_LINE}
${NEW_LINE}
I would like to donate stock to support ${charityName} (${profileUrl}). I have CCed better.giving (EIN 87-3758939) to ensure this tax-deductible donation gets accounted for correctly, please ask them if you have any technical questions.${NEW_LINE}
${NEW_LINE}
Please transfer [X] shares of [COMPANY_NAME] to:${NEW_LINE}
Deliver to: Fidelity Investments${NEW_LINE}
DTC number: 0226${NEW_LINE}
Account number: Z40390069${NEW_LINE}
Account name: Altruistic Partners Empowering Society, Inc${NEW_LINE}
Reference: [Internal Ref#, if needed] ${charityName} (${profileUrl})${NEW_LINE}
${NEW_LINE}
Thank you.`);
};
