import { EMAIL_SUPPORT } from "constants/env";

const NEW_LINE = "%0D%0A";

export default function Stocks() {
  return (
    <>
      <h3 className="text-2xl sm:text-3xl text-center leading-relaxed">
        Stocks
      </h3>
      <p>Coming Soon! 😃</p>
      <button
        type="button"
        className="btn-outline-filled btn-donate w-full"
        onClick={() => {
          window.open(`
          mailto:
            ?cc=${EMAIL_SUPPORT}
            &subject=Stock donation to Better.Giving supporting [Charity Name or profile url]
            &body=
Hi,${NEW_LINE}
${NEW_LINE}
I would like to donate stock to support [Charity Name or profile url]. I have CCed better.giving (EIN 87-3758939) to ensure this tax-deductible donation gets accounted for correctly, please ask them if you have any technical questions.${NEW_LINE}
${NEW_LINE}
Please transfer [X] shares of [COMPANY_NAME] to:${NEW_LINE}
Deliver to: Fidelity Investments${NEW_LINE}
DTC number: 0226${NEW_LINE}
Account number: Z40390069${NEW_LINE}
Account name: Altruistic Partners Empowering Society, Inc${NEW_LINE}
Reference: [Internal Ref#, if needed] [Charity Name]${NEW_LINE}
${NEW_LINE}
Thank you.`);
        }}
      >
        Send email
      </button>
    </>
  );
}
