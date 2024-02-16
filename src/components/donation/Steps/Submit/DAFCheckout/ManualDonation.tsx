import { EMAIL_SUPPORT } from "constants/env";
import { appRoutes } from "constants/routes";
import { ChariotCheckoutStep } from "slices/donation";

export default function ManualDonation(props: ChariotCheckoutStep) {
  const profileUrl = `${window.location.origin}${appRoutes.donate}/${props.recipient.id}`;

  return (
    <div className="grid content-start">
      <p className="text-center text-gray-d1 uppercase">Manual DAF donation</p>
      <p className="mt-4 text-center">
        To complete this donation, please email your provider with the following
        information:
      </p>
      <div className="grid rounded bg-gray-l5 dark:bg-bluegray-d1 p-3 text-sm leading-relaxed mt-6">
        <p>Please make a one-time grant of ${props.details.amount} to:</p>
        <br />
        <p>Altruistic Partners Empowering Society Inc (EIN: 87-3758939)</p>
        <p>16192 Costal Highway Lewes, DE 19958 USA</p>
        <p>
          Memo: For Altruistic Partners Empowering Society Inc (DBA: Better
          Giving)
        </p>
        <p>Contact Info: Chauncey St. John, Board Member</p>
        <p>Email: hi@better.giving</p>
        <p>
          Reference: [INTERNAL REF#, if needed] {props.recipient.name} (
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
        email us details of the amount you are donating and which project or
        projects to designate your donation to. Please send this email to
        support@better.giving.
      </p>

      <p className="mt-6 text-sm text-right text-balance">
        You may also generate an email that automatically includes needed
        information.
      </p>
      <a
        href={emailLink(props.recipient.name, profileUrl, props.details.amount)}
        className="btn btn-orange px-4 py-2 justify-self-end mt-2 text-xs font-normal"
      >
        Generate email
      </a>
    </div>
  );
}

const NEW_LINE = "%0D%0A";

const emailLink = (charityName: string, profileUrl: string, amount: string) => `
mailto:${"[ Your provider's email ]"}
  ?cc=${EMAIL_SUPPORT}
  &subject=Grant donation to Better.Giving supporting ${charityName}
  &body=
Hi,${NEW_LINE}
${NEW_LINE}
I would like to make a one-time grant to support ${charityName} (${profileUrl}). 
I have CCed better.giving (EIN 87-3758939) to ensure this tax-deductible donation gets accounted for correctly, 
please ask them if you have any technical questions.${NEW_LINE}
${NEW_LINE}
Please transfer $${amount || "[AMOUNT]"} to:${NEW_LINE}
${NEW_LINE}
Altruistic Partners Empowering Society Inc (EIN: 87-3758939)${NEW_LINE}
16192 Costal Highway Lewes, DE 19958 USA${NEW_LINE}
Memo: For Altruistic Partners Empowering Society Inc (DBA: Better Giving)${NEW_LINE}
Contact Info: Chauncey St. John, Board Member${NEW_LINE}
Email: hi@better.giving${NEW_LINE}
Reference: [INTERNAL REF#, if needed] ${charityName} (${profileUrl})${NEW_LINE}
${NEW_LINE}
Thank you.`;
